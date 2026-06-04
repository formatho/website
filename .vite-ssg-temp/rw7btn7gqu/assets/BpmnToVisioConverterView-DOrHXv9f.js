import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { f as useTwins, e as _sfc_main$1, c as _sfc_main$2 } from "../main.mjs";
import { C as CodeEditor } from "./CodeEditor-BDsujbIw.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6 } from "./CardFooter-DjcCkgh0.js";
import { FileCode, Upload, AlertCircle, CheckCircle2, Download } from "lucide-vue-next";
import "vite-plugin-node-polyfills/shims/buffer";
import "./vendor-B9Rn8KJJ.js";
import "@unhead/vue/server";
import "vue-router";
import "@vueuse/core";
import "clsx";
import "tailwind-merge";
import "radix-vue";
import "class-variance-authority";
import "unified";
import "remark-parse";
import "remark-gfm";
import "remark-rehype";
import "rehype-raw";
import "rehype-highlight";
import "rehype-stringify";
import "docx";
import "file-saver";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BpmnToVisioConverterView",
  __ssrInlineRender: true,
  setup(__props) {
    const { summonTwin } = useTwins();
    const bpmnInput = ref("");
    const error = ref("");
    const isConverting = ref(false);
    const conversionSuccess = ref(false);
    const visioBlob = ref(null);
    const fileName = ref("diagram");
    watch(conversionSuccess, (success) => {
      if (success && visioBlob.value) {
        summonTwin("flowtho", "Automation complete. Your Visio flow is ready.", "bpmn-success", {
          x: "right",
          y: 80
        });
      }
    });
    const bpmnToVisioMap = {
      "task": "Process",
      "userTask": "Process",
      "serviceTask": "Process",
      "scriptTask": "Process",
      "businessRuleTask": "Decision",
      "manualTask": "Process",
      "sendTask": "Process",
      "receiveTask": "Process",
      "startEvent": "Terminator",
      "endEvent": "Terminator",
      "intermediateCatchEvent": "Process",
      "intermediateThrowEvent": "Process",
      "exclusiveGateway": "Decision",
      "parallelGateway": "Process",
      "inclusiveGateway": "Decision",
      "eventBasedGateway": "Decision",
      "complexGateway": "Decision",
      "subProcess": "Process",
      "callActivity": "Process"
    };
    const parseBpmn = (xml) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "text/xml");
      const parseError = doc.querySelector("parsererror");
      if (parseError) {
        throw new Error("Invalid XML format: " + parseError.textContent?.substring(0, 100));
      }
      const definitions = doc.querySelector("definitions, bpmn\\:definitions");
      if (!definitions) {
        throw new Error("Invalid BPMN format: No BPMN definitions found");
      }
      const elements = [];
      const taskTypes = [
        "task",
        "userTask",
        "serviceTask",
        "scriptTask",
        "businessRuleTask",
        "manualTask",
        "sendTask",
        "receiveTask"
      ];
      taskTypes.forEach((type) => {
        const tasks = doc.querySelectorAll(type + ", bpmn\\:" + type);
        tasks.forEach((task, index) => {
          elements.push({
            id: task.getAttribute("id") || `${type}-${index}`,
            name: task.getAttribute("name") || type.replace(/([A-Z])/g, " $1").trim(),
            type,
            visioType: bpmnToVisioMap[type] || "Process"
          });
        });
      });
      const eventTypes = ["startEvent", "endEvent", "intermediateCatchEvent", "intermediateThrowEvent"];
      eventTypes.forEach((type) => {
        const events = doc.querySelectorAll(type + ", bpmn\\:" + type);
        events.forEach((event, index) => {
          elements.push({
            id: event.getAttribute("id") || `${type}-${index}`,
            name: event.getAttribute("name") || type.replace(/([A-Z])/g, " $1").trim(),
            type,
            visioType: bpmnToVisioMap[type] || "Terminator"
          });
        });
      });
      const gatewayTypes = ["exclusiveGateway", "parallelGateway", "inclusiveGateway", "eventBasedGateway", "complexGateway"];
      gatewayTypes.forEach((type) => {
        const gateways = doc.querySelectorAll(type + ", bpmn\\:" + type);
        gateways.forEach((gateway, index) => {
          elements.push({
            id: gateway.getAttribute("id") || `${type}-${index}`,
            name: gateway.getAttribute("name") || type.replace(/([A-Z])/g, " $1").trim(),
            type,
            visioType: bpmnToVisioMap[type] || "Decision"
          });
        });
      });
      const flows = doc.querySelectorAll("sequenceFlow, bpmn\\:sequenceFlow");
      const sequenceFlows = [];
      flows.forEach((flow, index) => {
        sequenceFlows.push({
          id: flow.getAttribute("id") || `flow-${index}`,
          name: flow.getAttribute("name") || "",
          sourceRef: flow.getAttribute("sourceRef") || "",
          targetRef: flow.getAttribute("targetRef") || ""
        });
      });
      return { elements, sequenceFlows, processName: extractProcessName(doc) };
    };
    const extractProcessName = (doc) => {
      const process = doc.querySelector("process, bpmn\\:process");
      if (process) {
        const name = process.getAttribute("name");
        if (name) return name;
        const id = process.getAttribute("id");
        if (id) return id;
      }
      return "BPMN-Diagram";
    };
    const generateVisioXml = (data) => {
      const { elements, sequenceFlows, processName } = data;
      const elementPositions = /* @__PURE__ */ new Map();
      const cols = Math.ceil(Math.sqrt(elements.length));
      elements.forEach((el, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        elementPositions.set(el.id, {
          x: 1.5 + col * 2,
          y: 8 - row * 1.5
        });
      });
      (/* @__PURE__ */ new Date()).toISOString();
      let shapesXml = "";
      elements.forEach((el, index) => {
        const pos = elementPositions.get(el.id) || { x: 1, y: 1 };
        const shapeId = index + 1;
        shapesXml += `
      <Shape ID="${shapeId}" Type="${el.visioType}" LineStyle="3" FillStyle="3" TextStyle="3">
        <Cell N="PinX" V="${pos.x}"/>
        <Cell N="PinY" V="${pos.y}"/>
        <Cell N="Width" V="1.5"/>
        <Cell N="Height" V="0.75"/>
        <Cell N="FillForegnd" V="#FFFFFF"/>
        <Cell N="FillBkgnd" V="#F8FAFC"/>
        <Cell N="LineWeight" V="0.01041666666666667"/>
        <Cell N="LineColor" V="#94A3B8"/>
        <Text><cp IX="0"/><pp IX="0/>${escapeXml(el.name)}</Text>
        <Section N="Geometry" IX="0">
          <Row T="RelMoveTo"><Cell N="X" V="0"/><Cell N="Y" V="0"/></Row>
          <Row T="RelLineTo"><Cell N="X" V="1"/><Cell N="Y" V="0"/></Row>
          <Row T="RelLineTo"><Cell N="X" V="1"/><Cell N="Y" V="1"/></Row>
          <Row T="RelLineTo"><Cell N="X" V="0"/><Cell N="Y" V="1"/></Row>
          <Row T="RelLineTo"><Cell N="X" V="0"/><Cell N="Y" V="0"/></Row>
        </Section>
      </Shape>`;
      });
      let connectorsXml = "";
      sequenceFlows.forEach((flow, index) => {
        const sourcePos = elementPositions.get(flow.sourceRef);
        const targetPos = elementPositions.get(flow.targetRef);
        if (sourcePos && targetPos) {
          const connectorId = elements.length + index + 1;
          connectorsXml += `
      <Shape ID="${connectorId}" Type="Shape" LineStyle="1" FillStyle="1" TextStyle="1">
        <Cell N="PinX" V="${(sourcePos.x + targetPos.x) / 2}"/>
        <Cell N="PinY" V="${(sourcePos.y + targetPos.y) / 2}"/>
        <Cell N="BeginX" V="${sourcePos.x + 0.75}"/>
        <Cell N="BeginY" V="${sourcePos.y}"/>
        <Cell N="EndX" V="${targetPos.x - 0.75}"/>
        <Cell N="EndY" V="${targetPos.y}"/>
        <Cell N="LineColor" V="#94A3B8"/>
        <Section N="Geometry" IX="0">
          <Row T="MoveTo"><Cell N="X" V="0" F="Width*0"/><Cell N="Y" V="0.5" F="Height*0.5"/></Row>
          <Row T="LineTo"><Cell N="X" V="1" F="Width*1"/><Cell N="Y" V="0.5" F="Height*0.5"/></Row>
        </Section>
      </Shape>`;
        }
      });
      return `<?xml version="1.0" encoding="UTF-8"?>
<VisioDocument xmlns="http://schemas.microsoft.com/visio/2003/core" 
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               metric="0" DocLangID="1033" version="11.0">
  <DocumentSettings TopPage="0" DefaultTextStyle="0" DefaultLineStyle="0" DefaultFillStyle="0">
    <GlueSettings>9</GlueSettings>
    <SnapSettings>65847</SnapSettings>
    <SnapExtensions>13</SnapExtensions>
    <SnapAngles/>
    <DynamicGridEnabled>0</DynamicGridEnabled>
    <ProtectStyles>0</ProtectStyles>
    <ProtectShapes>0</ProtectShapes>
    <ProtectMasters>0</ProtectMasters>
    <ProtectBkgnds>0</ProtectBkgnds>
  </DocumentSettings>
  <Colors>
    <ColorEntry IX="0" RGB="#000000"/>
    <ColorEntry IX="1" RGB="#FFFFFF"/>
    <ColorEntry IX="2" RGB="#FF0000"/>
    <ColorEntry IX="3" RGB="#00FF00"/>
    <ColorEntry IX="4" RGB="#0000FF"/>
    <ColorEntry IX="5" RGB="#FFFF00"/>
    <ColorEntry IX="6" RGB="#FF00FF"/>
    <ColorEntry IX="7" RGB="#00FFFF"/>
    <ColorEntry IX="8" RGB="#800000"/>
    <ColorEntry IX="9" RGB="#008000"/>
    <ColorEntry IX="10" RGB="#000080"/>
    <ColorEntry IX="11" RGB="#808000"/>
    <ColorEntry IX="12" RGB="#800080"/>
    <ColorEntry IX="13" RGB="#008080"/>
    <ColorEntry IX="14" RGB="#C0C0C0"/>
    <ColorEntry IX="15" RGB="#E6E6E6"/>
    <ColorEntry IX="16" RGB="#CDCDCD"/>
    <ColorEntry IX="17" RGB="#B3B3B3"/>
    <ColorEntry IX="18" RGB="#9A9A9A"/>
    <ColorEntry IX="19" RGB="#808080"/>
    <ColorEntry IX="20" RGB="#666666"/>
    <ColorEntry IX="21" RGB="#4D4D4D"/>
    <ColorEntry IX="22" RGB="#333333"/>
    <ColorEntry IX="23" RGB="#1A1A1A"/>
  </Colors>
  <StyleSheets>
    <StyleSheet ID="0" Name="Normal">
      <Line>
        <LineWeight>0.01041666666666667</LineWeight>
        <LineColor>0</LineColor>
        <LinePattern>1</LinePattern>
        <Rounding>0</Rounding>
        <BeginArrow>0</BeginArrow>
        <EndArrow>0</EndArrow>
      </Line>
      <Fill>
        <FillForegnd>1</FillForegnd>
        <FillBkgnd>0</FillBkgnd>
        <FillPattern>1</FillPattern>
        <ShdwForegnd>0</ShdwForegnd>
        <ShdwBkgnd>1</ShdwBkgnd>
        <ShdwPattern>0</ShdwPattern>
      </Fill>
      <Text>
        <Font>Calibri</Font>
        <Size>0.1666666666666667</Size>
        <Color>0</Color>
        <Style>0</Style>
        <Case>0</Case>
        <Pos>0</Pos>
        <Strikethru>0</Strikethru>
        <DoubleStrikethrough>0</DoubleStrikethrough>
        <Overline>0</Overline>
        <DoubleUnderline>0</DoubleUnderline>
        <SmallCaps>0</SmallCaps>
        <Outline>0</Outline>
        <Shadow>0</Shadow>
        <VerticalText>0</VerticalText>
        <Letterspace>0</Letterspace>
        <ColorTrans>0</ColorTrans>
      </Text>
    </StyleSheet>
  </StyleSheets>
  <Pages>
    <Page ID="0" Name="${escapeXml(processName)}" NameU="${escapeXml(processName)}">
      <PageProps>
        <PageWidth>11</PageWidth>
        <PageHeight>8.5</PageHeight>
        <ShdwOffsetX>0.125</ShdwOffsetX>
        <ShdwOffsetY>-0.125</ShdwOffsetY>
        <PageScale Unit="IN">1</PageScale>
        <DrawingScale Unit="IN">1</DrawingScale>
        <DrawingSizeType>0</DrawingSizeType>
        <DrawingScaleType>0</DrawingScaleType>
        <InhibitSnap>0</InhibitSnap>
      </PageProps>
      <PageSheet>
        <PageProps>
          <PageWidth>11</PageWidth>
          <PageHeight>8.5</PageHeight>
          <ShdwOffsetX>0.125</ShdwOffsetX>
          <ShdwOffsetY>-0.125</ShdwOffsetY>
          <PageScale Unit="IN">1</PageScale>
          <DrawingScale Unit="IN">1</DrawingScale>
          <DrawingSizeType>0</DrawingSizeType>
          <DrawingScaleType>0</DrawingScaleType>
          <InhibitSnap>0</InhibitSnap>
        </PageProps>
      </PageSheet>
      <Shapes>${shapesXml}${connectorsXml}
      </Shapes>
    </Page>
  </Pages>
</VisioDocument>`;
    };
    const escapeXml = (str) => {
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    };
    const handleConvert = () => {
      error.value = "";
      conversionSuccess.value = false;
      visioBlob.value = null;
      if (!bpmnInput.value.trim()) {
        error.value = "Please enter BPMN XML or upload a .bpmn file";
        return;
      }
      isConverting.value = true;
      try {
        const parsedData = parseBpmn(bpmnInput.value);
        if (parsedData.elements.length === 0) {
          throw new Error("No BPMN elements found. Please check your BPMN XML.");
        }
        const visioXml = generateVisioXml(parsedData);
        visioBlob.value = new Blob([visioXml], { type: "application/vnd.ms-visio" });
        fileName.value = parsedData.processName.replace(/[^a-zA-Z0-9_-]/g, "_") || "diagram";
        conversionSuccess.value = true;
      } catch (err) {
        error.value = err.message || "Failed to convert BPMN to Visio format";
        console.error("Conversion error:", err);
      } finally {
        isConverting.value = false;
      }
    };
    const handleFileUpload = (e) => {
      const target = e.target;
      const file = target.files?.[0];
      if (!file) return;
      if (!file.name.endsWith(".bpmn") && !file.name.endsWith(".xml")) {
        error.value = "Please upload a valid BPMN file (.bpmn or .xml)";
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        bpmnInput.value = content;
        error.value = "";
        conversionSuccess.value = false;
        visioBlob.value = null;
      };
      reader.onerror = () => {
        error.value = "Failed to read file";
      };
      reader.readAsText(file);
    };
    const handleDownload = () => {
      if (!visioBlob.value) return;
      const url = URL.createObjectURL(visioBlob.value);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName.value}.vdx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    const fillSample = () => {
      bpmnInput.value = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             targetNamespace="http://formatho.com/bpmn/sample">
  <process id="OrderProcess" name="Order Processing">
    <startEvent id="start" name="Order Received"/>
    <sequenceFlow id="flow1" sourceRef="start" targetRef="validate"/>
    <userTask id="validate" name="Validate Order"/>
    <sequenceFlow id="flow2" sourceRef="validate" targetRef="decision"/>
    <exclusiveGateway id="decision" name="Valid?"/>
    <sequenceFlow id="flow3" sourceRef="decision" targetRef="process_payment">Order Approved</sequenceFlow>
    <sequenceFlow id="flow4" sourceRef="decision" targetRef="notify_rejection">Order Rejected</sequenceFlow>
    <serviceTask id="process_payment" name="Process Payment"/>
    <sequenceFlow id="flow5" sourceRef="process_payment" targetRef="ship"/>
    <userTask id="ship" name="Ship Order"/>
    <sequenceFlow id="flow6" sourceRef="ship" targetRef="end_success"/>
    <endEvent id="end_success" name="Order Completed"/>
    <userTask id="notify_rejection" name="Notify Customer"/>
    <sequenceFlow id="flow7" sourceRef="notify_rejection" targetRef="end_failed"/>
    <endEvent id="end_failed" name="Order Cancelled"/>
  </process>
</definitions>`;
      error.value = "";
      conversionSuccess.value = false;
      visioBlob.value = null;
    };
    const reset = () => {
      bpmnInput.value = "";
      error.value = "";
      conversionSuccess.value = false;
      visioBlob.value = null;
      fileName.value = "diagram";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col p-4 gap-4 bg-muted/30" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold tracking-tight">BPMN to Visio Converter</h1><p class="text-sm text-muted-foreground mt-1"> Convert BPMN 2.0 process diagrams to Microsoft Visio (.vdx) format </p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        variant: "ghost",
        onClick: fillSample,
        "aria-label": "Load sample BPMN XML"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Load Sample`);
          } else {
            return [
              createTextVNode("Load Sample")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (bpmnInput.value) {
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          variant: "outline",
          onClick: reset,
          "aria-label": "Reset BPMN input"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Reset`);
            } else {
              return [
                createTextVNode("Reset")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="grid grid-cols-1 gap-4 flex-1 min-h-0">`);
      _push(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-col min-h-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FileCode), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` BPMN XML Input `);
                      } else {
                        return [
                          createVNode(unref(FileCode), { class: "h-4 w-4" }),
                          createTextVNode(" BPMN XML Input ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<label class="cursor-pointer"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    variant: "secondary",
                    size: "sm",
                    "aria-label": "Upload BPMN file",
                    class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md rounded-lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Upload), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Upload .bpmn File `);
                      } else {
                        return [
                          createVNode(unref(Upload), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Upload .bpmn File ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<input type="file" accept=".bpmn,.xml" class="hidden"${_scopeId2}></label></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode(unref(_sfc_main$5), { class: "text-sm font-medium flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(FileCode), { class: "h-4 w-4" }),
                          createTextVNode(" BPMN XML Input ")
                        ]),
                        _: 1
                      }),
                      createVNode("label", { class: "cursor-pointer" }, [
                        createVNode(unref(_sfc_main$2), {
                          variant: "secondary",
                          size: "sm",
                          "aria-label": "Upload BPMN file",
                          class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md rounded-lg"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Upload), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Upload .bpmn File ")
                          ]),
                          _: 1
                        }),
                        createVNode("input", {
                          type: "file",
                          accept: ".bpmn,.xml",
                          class: "hidden",
                          onChange: handleFileUpload
                        }, null, 32)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "flex-1 min-h-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CodeEditor, {
                    modelValue: bpmnInput.value,
                    "onUpdate:modelValue": ($event) => bpmnInput.value = $event,
                    language: "xml",
                    class: "min-h-[256px] md:h-full",
                    placeholder: "Paste your BPMN XML here, or upload a .bpmn file above..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CodeEditor, {
                      modelValue: bpmnInput.value,
                      "onUpdate:modelValue": ($event) => bpmnInput.value = $event,
                      language: "xml",
                      class: "min-h-[256px] md:h-full",
                      placeholder: "Paste your BPMN XML here, or upload a .bpmn file above..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode(unref(_sfc_main$5), { class: "text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(FileCode), { class: "h-4 w-4" }),
                        createTextVNode(" BPMN XML Input ")
                      ]),
                      _: 1
                    }),
                    createVNode("label", { class: "cursor-pointer" }, [
                      createVNode(unref(_sfc_main$2), {
                        variant: "secondary",
                        size: "sm",
                        "aria-label": "Upload BPMN file",
                        class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md rounded-lg"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Upload), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Upload .bpmn File ")
                        ]),
                        _: 1
                      }),
                      createVNode("input", {
                        type: "file",
                        accept: ".bpmn,.xml",
                        class: "hidden",
                        onChange: handleFileUpload
                      }, null, 32)
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), { class: "flex-1 min-h-0" }, {
                default: withCtx(() => [
                  createVNode(CodeEditor, {
                    modelValue: bpmnInput.value,
                    "onUpdate:modelValue": ($event) => bpmnInput.value = $event,
                    language: "xml",
                    class: "min-h-[256px] md:h-full",
                    placeholder: "Paste your BPMN XML here, or upload a .bpmn file above..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (error.value) {
        _push(ssrRenderComponent(unref(_sfc_main$3), { class: "border-red-300 bg-red-50" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "py-3 flex items-center gap-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(AlertCircle), { class: "h-5 w-5 text-red-600 shrink-0" }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-sm text-red-700 font-medium"${_scopeId2}>${ssrInterpolate(error.value)}</p>`);
                  } else {
                    return [
                      createVNode(unref(AlertCircle), { class: "h-5 w-5 text-red-600 shrink-0" }),
                      createVNode("p", { class: "text-sm text-red-700 font-medium" }, toDisplayString(error.value), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$6), { class: "py-3 flex items-center gap-3" }, {
                  default: withCtx(() => [
                    createVNode(unref(AlertCircle), { class: "h-5 w-5 text-red-600 shrink-0" }),
                    createVNode("p", { class: "text-sm text-red-700 font-medium" }, toDisplayString(error.value), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-center py-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        onClick: handleConvert,
        disabled: isConverting.value || !bpmnInput.value.trim(),
        size: "lg",
        "aria-label": "Convert BPMN to Visio",
        class: "px-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md rounded-lg bg-slate-800 hover:bg-slate-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isConverting.value) {
              _push2(`<span${_scopeId}>Converting...</span>`);
            } else {
              _push2(`<span${_scopeId}>Convert to Visio</span>`);
            }
          } else {
            return [
              isConverting.value ? (openBlock(), createBlock("span", { key: 0 }, "Converting...")) : (openBlock(), createBlock("span", { key: 1 }, "Convert to Visio"))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (conversionSuccess.value && visioBlob.value) {
        _push(ssrRenderComponent(unref(_sfc_main$3), { class: "border-green-300 bg-green-50" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "py-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex flex-col md:flex-row items-center justify-between gap-4"${_scopeId2}><div class="flex items-center gap-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(CheckCircle2), { class: "h-6 w-6 text-green-600 shrink-0" }, null, _parent3, _scopeId2));
                    _push3(`<div${_scopeId2}><p class="text-sm font-semibold text-green-800"${_scopeId2}>Conversion Successful!</p><p class="text-xs text-green-600"${_scopeId2}>Your Visio file is ready for download</p></div></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$2), {
                      onClick: handleDownload,
                      "aria-label": "Download Visio file",
                      class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md rounded-lg bg-green-600 hover:bg-green-700"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Download), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(` Download Visio (.vdx) `);
                        } else {
                          return [
                            createVNode(unref(Download), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Download Visio (.vdx) ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex flex-col md:flex-row items-center justify-between gap-4" }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode(unref(CheckCircle2), { class: "h-6 w-6 text-green-600 shrink-0" }),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-semibold text-green-800" }, "Conversion Successful!"),
                            createVNode("p", { class: "text-xs text-green-600" }, "Your Visio file is ready for download")
                          ])
                        ]),
                        createVNode(unref(_sfc_main$2), {
                          onClick: handleDownload,
                          "aria-label": "Download Visio file",
                          class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md rounded-lg bg-green-600 hover:bg-green-700"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Download), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Download Visio (.vdx) ")
                          ]),
                          _: 1
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$6), { class: "py-4" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-col md:flex-row items-center justify-between gap-4" }, [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode(unref(CheckCircle2), { class: "h-6 w-6 text-green-600 shrink-0" }),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-semibold text-green-800" }, "Conversion Successful!"),
                          createVNode("p", { class: "text-xs text-green-600" }, "Your Visio file is ready for download")
                        ])
                      ]),
                      createVNode(unref(_sfc_main$2), {
                        onClick: handleDownload,
                        "aria-label": "Download Visio file",
                        class: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md rounded-lg bg-green-600 hover:bg-green-700"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Download), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Download Visio (.vdx) ")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-auto pt-4 border-t border-gray-200"><div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground"><div class="flex items-start gap-2">`);
      _push(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4 text-green-600 mt-0.5 shrink-0" }, null, _parent));
      _push(`<span>100% client-side processing - your data never leaves the browser</span></div><div class="flex items-start gap-2">`);
      _push(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4 text-green-600 mt-0.5 shrink-0" }, null, _parent));
      _push(`<span>Supports tasks, events, gateways, and sequence flows</span></div><div class="flex items-start gap-2">`);
      _push(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4 text-green-600 mt-0.5 shrink-0" }, null, _parent));
      _push(`<span>Outputs Microsoft Visio VDX format (.vdx)</span></div></div></div><div class="mt-4 p-6 bg-muted/20 rounded-lg border border-border"><h2 class="text-xl font-bold mb-4">Related Tools</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><a href="/tools/bpmn" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"><h3 class="font-semibold mb-2">BPMN Viewer</h3><p class="text-sm text-muted-foreground">View and export BPMN diagrams as PDF</p></a><a href="/tools/xml-json" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"><h3 class="font-semibold mb-2">XML to JSON Converter</h3><p class="text-sm text-muted-foreground">Convert XML documents to JSON format</p></a><a href="/tools/xml-formatter" class="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/30 transition-all"><h3 class="font-semibold mb-2">XML Formatter</h3><p class="text-sm text-muted-foreground">Format and beautify XML documents</p></a></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/BpmnToVisioConverterView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
