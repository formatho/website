<?php
/**
 * The template for displaying single posts
 *
 * @package Formatho
 * @since 1.1.0
 */

get_header();
?>

<main class="site-main" style="padding: 0;">
    <div class="single-post-wrapper" style="max-width: 800px; margin: 0 auto; padding: 3rem 2rem;">
        <?php
        while (have_posts()) {
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('single-post glass-card'); ?> style="padding: 2.5rem;">
                
                <!-- Post Header -->
                <header class="entry-header" style="text-align: center; margin-bottom: 2rem;">
                    <?php 
                    $categories = get_the_category();
                    if ($categories) {
                        echo '<div style="margin-bottom: 1rem;">';
                        foreach ($categories as $cat) {
                            echo '<a href="' . esc_url(get_category_link($cat->term_id)) . '" class="badge" style="text-decoration: none;">' . esc_html($cat->name) . '</a> ';
                        }
                        echo '</div>';
                    }
                    ?>
                    
                    <?php the_title('<h1 class="entry-title" style="font-size: 2.5rem; line-height: 1.2; margin-bottom: 1.5rem;">', '</h1>'); ?>
                    
                    <div class="entry-meta" style="display: flex; align-items: center; justify-content: center; gap: 1.5rem; color: var(--formatho-muted-text); font-size: 0.875rem;">
                        <span style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                                <line x1="16" x2="16" y1="2" y2="6"/>
                                <line x1="8" x2="8" y1="2" y2="6"/>
                                <line x1="3" x2="21" y1="10" y2="10"/>
                            </svg>
                            <?php echo get_the_date('F j, Y'); ?>
                        </span>
                        <span style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            <?php the_author(); ?>
                        </span>
                        <span style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            <?php echo ceil(str_word_count(get_the_content()) / 200); ?> min read
                        </span>
                    </div>
                </header>

                <!-- Featured Image -->
                <?php if (has_post_thumbnail()) { ?>
                    <div class="post-thumbnail" style="margin: 0 -2.5rem 2rem -2.5rem;">
                        <?php the_post_thumbnail('large', array('style' => 'width: 100%; height: auto; border-radius: var(--formatho-radius);')); ?>
                    </div>
                <?php } ?>

                <!-- Post Content -->
                <div class="entry-content" style="
                    font-size: 1.125rem;
                    line-height: 1.8;
                    color: var(--formatho-foreground);
                ">
                    <?php
                    the_content();
                    
                    wp_link_pages(array(
                        'before' => '<div class="page-links" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--formatho-border);">' . __('Pages:', 'formatho'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>

                <!-- Tags -->
                <?php
                $tags = get_the_tags();
                if ($tags) {
                    ?>
                    <div class="tags-links" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--formatho-border); display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <?php 
                        foreach ($tags as $tag) {
                            echo '<a href="' . esc_url(get_tag_link($tag->term_id)) . '" class="badge" style="text-decoration: none; font-size: 0.75rem;">' . esc_html($tag->name) . '</a>';
                        }
                        ?>
                    </div>
                    <?php
                }
                ?>

                <!-- Share Section -->
                <div class="share-section" style="margin-top: 2rem; padding: 1.5rem; background: var(--formatho-secondary); border-radius: var(--formatho-radius); text-align: center;">
                    <p style="margin-bottom: 1rem; font-weight: 500; color: var(--formatho-foreground);">Share this article</p>
                    <div style="display: flex; justify-content: center; gap: 1rem;">
                        <a href="https://twitter.com/intent/tweet?text=<?php echo urlencode(get_the_title()); ?>&url=<?php echo urlencode(get_permalink()); ?>" 
                           target="_blank" 
                           style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--formatho-bg); border-radius: 50%; color: var(--formatho-primary); transition: all 0.2s ease;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo urlencode(get_permalink()); ?>&title=<?php echo urlencode(get_the_title()); ?>" 
                           target="_blank" 
                           style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--formatho-bg); border-radius: 50%; color: var(--formatho-primary); transition: all 0.2s ease;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                <rect width="4" height="12" x="2" y="9"/>
                                <circle cx="4" cy="4" r="2"/>
                            </svg>
                        </a>
                        <button onclick="navigator.clipboard.writeText('<?php echo get_permalink(); ?>').then(() => alert('Link copied!'))" 
                                style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--formatho-bg); border: none; border-radius: 50%; color: var(--formatho-primary); cursor: pointer; transition: all 0.2s ease;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                            </svg>
                        </button>
                    </div>
                </div>

            </article>

            <!-- Post Navigation -->
            <nav class="post-navigation" style="margin-top: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <?php
                $prev_post = get_previous_post();
                $next_post = get_next_post();
                
                if ($prev_post) {
                    echo '<a href="' . get_permalink($prev_post) . '" class="glass-card" style="padding: 1.5rem; text-decoration: none; display: block;">
                        <span style="font-size: 0.75rem; color: var(--formatho-muted-text);">← Previous</span>
                        <p style="margin: 0.5rem 0 0; font-weight: 500; color: var(--formatho-foreground);">' . get_the_title($prev_post) . '</p>
                    </a>';
                } else {
                    echo '<div></div>';
                }
                
                if ($next_post) {
                    echo '<a href="' . get_permalink($next_post) . '" class="glass-card" style="padding: 1.5rem; text-decoration: none; display: block; text-align: right;">
                        <span style="font-size: 0.75rem; color: var(--formatho-muted-text);">Next →</span>
                        <p style="margin: 0.5rem 0 0; font-weight: 500; color: var(--formatho-foreground);">' . get_the_title($next_post) . '</p>
                    </a>';
                }
                ?>
            </nav>

            <?php
            // Comments (disabled for cleaner look, but structure preserved)
            // if (comments_open() || get_comments_number()) {
            //     comments_template();
            // }
            ?>
            
            <?php } ?>
    </div>
</main>

<style>
/* Single Post Content Styles */
.single-post .entry-content h2 {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    font-size: 1.75rem;
    line-height: 1.3;
}

.single-post .entry-content h3 {
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    font-size: 1.375rem;
    line-height: 1.4;
}

.single-post .entry-content p {
    margin-bottom: 1.5rem;
}

.single-post .entry-content ul,
.single-post .entry-content ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
}

.single-post .entry-content li {
    margin-bottom: 0.5rem;
}

.single-post .entry-content a {
    color: var(--formatho-primary);
    text-decoration: underline;
    text-underline-offset: 2px;
}

.single-post .entry-content a:hover {
    color: var(--formatho-foreground);
}

.single-post .entry-content img {
    max-width: 100%;
    height: auto;
    border-radius: var(--formatho-radius);
    margin: 2rem 0;
}

.single-post .entry-content blockquote {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--formatho-secondary);
    border-left: 4px solid var(--formatho-primary);
    border-radius: 0 var(--formatho-radius) var(--formatho-radius) 0;
    font-style: italic;
}

.single-post .entry-content code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875em;
    padding: 0.2em 0.4em;
    background: var(--formatho-secondary);
    border-radius: 4px;
}

.single-post .entry-content pre {
    font-family: 'JetBrains Mono', monospace;
    padding: 1.5rem;
    background: var(--formatho-secondary);
    border-radius: var(--formatho-radius);
    overflow-x: auto;
    margin: 1.5rem 0;
    font-size: 0.875rem;
    line-height: 1.6;
}

.single-post .entry-content pre code {
    padding: 0;
    background: none;
}

/* Post Navigation Hover */
.post-navigation a:hover {
    border-color: rgba(0, 180, 216, 0.5);
}

/* Share buttons hover */
.share-section a:hover,
.share-section button:hover {
    background: rgba(0, 180, 216, 0.1);
    transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
    .single-post-wrapper {
        padding: 1.5rem 1rem;
    }
    
    .single-post.glass-card {
        padding: 1.5rem;
    }
    
    .single-post .entry-header h1 {
        font-size: 1.75rem;
    }
    
    .post-thumbnail {
        margin: 0 -1.5rem 1.5rem -1.5rem;
    }
    
    .post-navigation {
        grid-template-columns: 1fr;
    }
}
</style>

<?php
get_footer();
