<?php
/**
 * Plugin Name: Documents-CRSE Ultimate Pro v27.1
 * Description: Tri hybride (numéro > date signature > date pub). Accueil par cards
 * catégories. Sidebar contextuelle : mode catégorie = pas de filtre "type",
 * masque le champ numéro si la catégorie n'en a pas. Mode "tous" = sidebar
 * complète. Sort bar adaptative. Responsive top. SYNC URL.
 * Compatible PHP 5.6–8.x / WP 4.9+
 * Version: 27.1.0
 * Author: Elhadji Mamadou Lamine Sané
 * Requires at least: 4.9
 * Requires PHP: 5.6
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ============================================================
   CONSTANTES
   ============================================================ */
define( 'CRSE_VERSION',   '27.1.0' );
define( 'CRSE_POST_TYPE', 'crse_document' );
define( 'CRSE_TAX_CAT',   'crse_document_cat' );
define( 'CRSE_TAX_SEC',   'crse_secteur' );
define( 'CRSE_NONCE',     'crse_save_nonce' );
define( 'CRSE_ACTION',    'crse_save' );

/* ============================================================
   1. ENREGISTREMENT CPT + TAXONOMIES
   ============================================================ */
add_action( 'init', 'crse_register_post_type' );
function crse_register_post_type() {
    register_post_type( CRSE_POST_TYPE, array(
        'labels'       => array(
            'name'           => 'Documents-CRSE',
            'singular_name'  => 'Document',
            'add_new'        => 'Ajouter un document',
            'add_new_item'   => 'Ajouter un nouveau document',
            'edit_item'      => 'Modifier le document',
            'new_item'       => 'Nouveau document',
            'view_item'      => 'Voir le document',
            'search_items'   => 'Rechercher des documents',
            'not_found'      => 'Aucun document trouvé',
            'all_items'      => 'Tous les documents',
            'menu_name'      => 'Documents-CRSE',
            'name_admin_bar' => 'Document',
        ),
        'public'       => true,
        'has_archive'  => true,
        'menu_icon'    => 'dashicons-pdf',
        'supports'     => array( 'title' ),
        'show_in_rest' => true,
    ) );

    register_taxonomy( CRSE_TAX_CAT, array( CRSE_POST_TYPE ), array(
        'hierarchical'      => true,
        'labels'            => array(
            'name'          => 'Types de document',
            'singular_name' => 'Type de document',
        ),
        'show_admin_column' => true,
    ) );

    register_taxonomy( CRSE_TAX_SEC, array( CRSE_POST_TYPE ), array(
        'hierarchical'      => true,
        'labels'            => array(
            'name'          => 'Secteurs',
            'singular_name' => 'Secteur',
        ),
        'show_admin_column' => true,
    ) );
}

/* ============================================================
   1b. ENQUEUE WP MEDIA POUR LE BACKOFFICE (SÉCURISATION CHARGEMENT)
   ============================================================ */
add_action( 'admin_enqueue_scripts', 'crse_enqueue_admin_media' );
function crse_enqueue_admin_media( $hook ) {
    global $post;
    if ( ( 'post-new.php' === $hook || 'post.php' === $hook ) && isset( $post->post_type ) && CRSE_POST_TYPE === $post->post_type ) {
        wp_enqueue_media();
    }
}

/* ============================================================
   2. COLONNES BACK-OFFICE
   ============================================================ */
add_filter( 'manage_' . CRSE_POST_TYPE . '_posts_columns', 'crse_manage_columns' );
function crse_manage_columns( $cols ) {
    $new = array(
        'cb'       => $cols['cb'],
        'col_num'  => 'N&deg; Document',
        'col_sort' => 'Cl&eacute; de tri',
        'title'    => 'Titre du Document',
    );
    unset( $cols['cb'], $cols['title'] );
    return array_merge( $new, $cols );
}

add_action( 'manage_' . CRSE_POST_TYPE . '_posts_custom_column', 'crse_custom_column', 10, 2 );
function crse_custom_column( $col, $id ) {
    if ( 'col_num' === $col ) {
        $num = get_post_meta( $id, '_crse_document_number', true );
        echo '<strong>' . ( $num ? esc_html( $num ) : '&mdash;' ) . '</strong>';
    }
    if ( 'col_sort' === $col ) {
        $key = get_post_meta( $id, '_crse_sort_key', true );
        echo '<code style="font-size:11px;color:#888;">' . ( $key ? esc_html( $key ) : '&mdash;' ) . '</code>';
    }
}

/* ============================================================
   3. FILTRES BACK-OFFICE
   ============================================================ */
add_action( 'restrict_manage_posts', 'crse_admin_filters' );
function crse_admin_filters( $post_type ) {
    if ( CRSE_POST_TYPE !== $post_type ) { return; }
    foreach ( array( CRSE_TAX_CAT => 'Types', CRSE_TAX_SEC => 'Secteurs' ) as $tax => $label ) {
        wp_dropdown_categories( array(
            'show_option_all' => 'Voir tous les ' . $label,
            'taxonomy'        => $tax,
            'name'            => $tax,
            'selected'        => get_query_var( $tax ),
            'value_field'     => 'slug',
        ) );
    }
}

/* ============================================================
   4. META BOX
   ============================================================ */
add_action( 'add_meta_boxes', 'crse_add_meta_box' );
function crse_add_meta_box() {
    add_meta_box( 'crse_meta', 'Param&egrave;tres du Document', 'crse_meta_cb', CRSE_POST_TYPE, 'normal', 'high' );
}

function crse_meta_cb( $post ) {
    $file_id  = get_post_meta( $post->ID, '_crse_doc_id',          true );
    $doc_date = get_post_meta( $post->ID, '_crse_document_date',   true );
    $doc_num  = get_post_meta( $post->ID, '_crse_document_number', true );
    $sort_key = get_post_meta( $post->ID, '_crse_sort_key',        true );
    wp_nonce_field( CRSE_ACTION, CRSE_NONCE );

    $num_val  = trim( (string) $doc_num );
    $date_val = trim( (string) $doc_date );
    if ( '' !== $num_val ) {
        $sort_info = '<span style="color:green;">&#x2192; Basé sur le numéro officiel</span>';
    } elseif ( '' !== $date_val ) {
        $sort_info = '<span style="color:#1e4691;">&#x2192; Basé sur la date de signature</span>';
    } else {
        $sort_info = '<span style="color:#aaa;">&#x2192; Basé sur la date de publication WP</span>';
    }
    ?>
    <div class="crse-meta-box-wrapper" style="padding:15px;background:#f4f7f9;border:1px solid #ccd0d4;border-radius:4px;">
        <div style="background:#fff3cd;border:1px solid #ffc107;padding:10px 14px;border-radius:4px;margin-bottom:15px;font-size:12px;color:#856404;">
            <strong>Règle de tri&nbsp;:</strong>
            Numéro officiel (prioritaire) &rarr; Date de signature &rarr; Date de publication WP.
            Renseigner <em>au moins un des deux</em> champs.
        </div>
        <div style="display:flex;gap:20px;margin-bottom:15px;flex-wrap:wrap;">
            <div>
                <label><strong>Num&eacute;ro Officiel <em>(optionnel)</em>&nbsp;:</strong></label><br>
                <input type="text" name="crse_number" value="<?php echo esc_attr( $doc_num ); ?>"
                       style="padding:8px;width:200px;" placeholder="ex: 2026-042">
                <p style="font-size:11px;color:#888;margin:4px 0 0;">Laisser vide si aucun numéro.</p>
            </div>
            <div>
                <label><strong>Date de signature <em>(optionnelle)</em>&nbsp;:</strong></label><br>
                <input type="date" name="crse_date" value="<?php echo esc_attr( $doc_date ); ?>"
                       style="padding:8px;width:200px;">
                <p style="font-size:11px;color:#888;margin:4px 0 0;">Utilisée si pas de numéro.</p>
            </div>
        </div>
        <?php if ( $sort_key ) : ?>
        <p style="font-size:11px;color:#888;margin:0 0 10px;">
            Cl&eacute; de tri&nbsp;: <code><?php echo esc_html( $sort_key ); ?></code>
            &nbsp;&mdash;&nbsp;<?php echo wp_kses( $sort_info, array( 'span' => array( 'style' => array() ) ) ); ?>
        </p>
        <?php endif; ?>
        <input type="hidden" name="crse_file_id" id="crse_file_id" value="<?php echo esc_attr( $file_id ); ?>">
        <button type="button" class="button button-primary" id="crse_up_btn">Lier le PDF</button>
        <span id="pdf-status" style="margin-left:10px;font-weight:bold;">
            <?php echo $file_id ? '&#x2705; PDF lié' : '&#x274C; Aucun PDF'; ?>
        </span>
    </div>
    <script>
    jQuery(document).ready(function($){
        // Utilisation d'une délégation globale sur le document pour contrer le re-render asynchrone de Gutenberg
        $(document).on('click', '#crse_up_btn', function(e){
            e.preventDefault();
            if (typeof wp !== 'undefined' && wp.media) {
                var custom_uploader = wp.media({ title: 'Sélectionner le document', multiple: false })
                    .on('select', function(){
                        var att = custom_uploader.state().get('selection').first().toJSON();
                        
                        // Injection de la valeur
                        $('#crse_file_id').val(att.id).trigger('change');
                        $('#pdf-status').html('&#x2705; Document lié (Cliquez sur Mettre à jour en haut)');
                        
                        // Forcer Gutenberg à détecter le changement dans le formulaire
                        if (typeof wp.data !== 'undefined' && wp.data.dispatch('core/editor')) {
                            wp.data.dispatch('core/editor').editPost({ meta: { _crse_doc_id: att.id } });
                        }
                    })
                    .open();
            } else {
                alert('Erreur: La librairie des médias WordPress n’a pas pu être chargée.');
            }
        });
    });
    </script>
    <?php
}

/* ============================================================
   5. SAUVEGARDE META + SORT KEY (TOTALEMENT SÉCURISÉE)
   ============================================================ */
add_action( 'save_post', 'crse_save_post_meta', 10, 2 );
function crse_save_post_meta( $id, $post ) {
    if ( ! isset( $_POST[ CRSE_NONCE ] ) ) { return; }
    if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[ CRSE_NONCE ] ) ), CRSE_ACTION ) ) { return; }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) { return; }
    if ( ! current_user_can( 'edit_post', $id ) ) { return; }
    if ( CRSE_POST_TYPE !== $post->post_type ) { return; }

    $file_id  = isset( $_POST['crse_file_id'] ) ? absint( $_POST['crse_file_id'] ) : 0;
    $doc_date = isset( $_POST['crse_date'] )    ? sanitize_text_field( wp_unslash( $_POST['crse_date'] ) ) : '';
    $doc_num  = isset( $_POST['crse_number'] )  ? sanitize_text_field( wp_unslash( $_POST['crse_number'] ) ) : '';

    if ( $file_id > 0 ) {
        update_post_meta( $id, '_crse_doc_id', $file_id );
    } else {
        delete_post_meta( $id, '_crse_doc_id' );
    }

    update_post_meta( $id, '_crse_document_date',   $doc_date );
    update_post_meta( $id, '_crse_document_number', $doc_num );

    $pub_date = ( $post && $post->post_date ) ? $post->post_date : '';
    update_post_meta( $id, '_crse_sort_key', crse_build_sort_key( $doc_num, $doc_date, $pub_date ) );
}

/* ============================================================
   6. CONSTRUCTION SORT KEY — TRI HYBRIDE
   ============================================================ */
function crse_build_sort_key( $num, $sig_date, $pub_date ) {
    $num      = trim( (string) $num );
    $sig_date = trim( (string) $sig_date );
    $pub_date = trim( (string) $pub_date );

    if ( '' !== $num ) {
        if ( preg_match( '/(\d{4})\D+(\d+)/', $num, $m ) ) {
            return 'A' . $m[1] . str_pad( $m[2], 6, '0', STR_PAD_LEFT );
        }
        if ( preg_match( '/(\d+)/', $num, $m ) ) {
            return 'A' . str_pad( $m[1], 10, '0', STR_PAD_LEFT );
        }
        return 'A' . $num;
    }

    if ( '' !== $sig_date ) {
        $ts = strtotime( $sig_date );
        if ( false !== $ts && $ts > 0 ) { return 'B' . date( 'YmdHis', $ts ); }
    }

    if ( '' !== $pub_date ) {
        $ts = strtotime( $pub_date );
        if ( false !== $ts && $ts > 0 ) { return 'C' . date( 'YmdHis', $ts ); }
    }

    return 'Z9999999999';
}

/* ============================================================
   7. MIGRATION  /wp-admin/?crse_migrate=1
   ============================================================ */
add_action( 'admin_init', 'crse_maybe_migrate_sort_keys' );
function crse_maybe_migrate_sort_keys() {
    if ( ! isset( $_GET['crse_migrate'] ) || '1' !== $_GET['crse_migrate'] ) { return; }
    if ( ! current_user_can( 'manage_options' ) ) { wp_die( 'Permission refusée.' ); }

    if ( ! isset( $_GET['crse_migrate_nonce'] )
        || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_GET['crse_migrate_nonce'] ) ), 'crse_migrate_action' )
    ) {
        wp_die(
            '<p>Cliquez sur le lien sécurisé pour lancer la migration&nbsp;:</p>'
            . '<p><a href="' . esc_url( wp_nonce_url( admin_url( '?crse_migrate=1' ), 'crse_migrate_action', 'crse_migrate_nonce' ) ) . '" class="button button-primary">Lancer la migration</a></p>'
        );
    }

    $posts = get_posts( array( 'post_type' => CRSE_POST_TYPE, 'posts_per_page' => -1, 'post_status' => 'any', 'fields' => 'ids' ) );
    $count = 0;
    foreach ( $posts as $pid ) {
        $p = get_post( $pid );
        update_post_meta( $pid, '_crse_sort_key', crse_build_sort_key(
            (string) get_post_meta( $pid, '_crse_document_number', true ),
            (string) get_post_meta( $pid, '_crse_document_date',   true ),
            ( $p && $p->post_date ) ? $p->post_date : ''
        ) );
        $count++;
    }
    wp_die(
        '<p>&#x2705; Migration terminée&nbsp;: <strong>' . intval( $count ) . '</strong> document(s) mis à jour.</p>'
        . '<p><a href="' . esc_url( admin_url( 'edit.php?post_type=' . CRSE_POST_TYPE ) ) . '">&larr; Retour</a></p>'
    );
}

/* ============================================================
   8. AJAX — FILTRE DOCUMENTS (PAGINATION CORRIGÉE)
   ============================================================ */
add_action( 'wp_ajax_crse_filter',        'crse_ajax_filter' );
add_action( 'wp_ajax_nopriv_crse_filter', 'crse_ajax_filter' );

function crse_ajax_filter() {
    if ( ! isset( $_POST['nonce'] )
        || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'crse_ajax_nonce' )
    ) {
        wp_send_json_error( 'Accès non autorisé.', 403 );
    }

    $paged      = isset( $_POST['paged'] )      ? absint( $_POST['paged'] ) : 1;
    $sort       = ( isset( $_POST['sort'] ) && 'ASC' === strtoupper( sanitize_text_field( wp_unslash( $_POST['sort'] ) ) ) ) ? 'ASC' : 'DESC';
    $search     = isset( $_POST['search'] )     ? sanitize_text_field( wp_unslash( $_POST['search'] ) )     : '';
    $num_search = isset( $_POST['num_search'] ) ? sanitize_text_field( wp_unslash( $_POST['num_search'] ) ) : '';
    $cat_single = isset( $_POST['cat_single'] ) ? sanitize_title( wp_unslash( $_POST['cat_single'] ) )      : '';

    $cats = array();
    if ( ! empty( $_POST['cats'] ) && is_array( $_POST['cats'] ) ) {
        foreach ( (array) $_POST['cats'] as $v ) {
            $s = sanitize_title( wp_unslash( $v ) );
            if ( $s ) { $cats[] = $s; }
        }
    }
    $secs = array();
    if ( ! empty( $_POST['secs'] ) && is_array( $_POST['secs'] ) ) {
        foreach ( (array) $_POST['secs'] as $v ) {
            $s = sanitize_title( wp_unslash( $v ) );
            if ( $s ) { $secs[] = $s; }
        }
    }

    $meta_query = array(
        'relation'    => 'AND',
        'sort_clause' => array( 'key' => '_crse_sort_key', 'compare' => 'EXISTS' ),
    );
    if ( '' !== $num_search ) {
        $meta_query[] = array( 'key' => '_crse_document_number', 'value' => $num_search, 'compare' => 'LIKE' );
    }

    $args = array(
        'post_type'      => CRSE_POST_TYPE,
        'posts_per_page' => 10,
        'paged'          => $paged,
        'post_status'    => 'publish',
        's'              => $search,
        'tax_query'      => array( 'relation' => 'AND' ),
        'meta_query'     => $meta_query,
        'orderby'        => array( 'sort_clause' => $sort ),
    );

    if ( '' !== $cat_single ) {
        $args['tax_query'][] = array( 'taxonomy' => CRSE_TAX_CAT, 'field' => 'slug', 'terms' => array( $cat_single ) );
    } elseif ( ! empty( $cats ) ) {
        $args['tax_query'][] = array( 'taxonomy' => CRSE_TAX_CAT, 'field' => 'slug', 'terms' => $cats );
    }
    if ( ! empty( $secs ) ) {
        $args['tax_query'][] = array( 'taxonomy' => CRSE_TAX_SEC, 'field' => 'slug', 'terms' => $secs );
    }

    $query = new WP_Query( $args );

    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $pid      = get_the_ID();
            $doc_date = get_post_meta( $pid, '_crse_document_date',   true );
            $doc_num  = get_post_meta( $pid, '_crse_document_number', true );
            $link     = home_url( '/?view_doc=' . base64_encode( $pid ) );

            $tri_icon = '';
            if ( '' === trim( (string) $doc_num ) ) {
                $tri_label = $doc_date ? 'Classé par date de signature' : 'Classé par date de publication';
                $tri_icon  = ' <span class="crse-tri-icon" title="' . esc_attr( $tri_label ) . '">&#128197;</span>';
            }
            ?>
            <article class="crse-result-item">
                <div class="crse-badges">
                    <?php if ( $doc_num ) : ?>
                        <span class="badge badge-num">N&deg;&nbsp;<?php echo esc_html( $doc_num ); ?></span>
                    <?php endif; ?>
                    <?php
                    $cat_terms = get_the_terms( $pid, CRSE_TAX_CAT );
                    if ( $cat_terms && ! is_wp_error( $cat_terms ) ) {
                        foreach ( $cat_terms as $t ) {
                            echo '<span class="badge badge-blue">' . esc_html( $t->name ) . '</span>';
                        }
                    }
                    $sec_terms = get_the_terms( $pid, CRSE_TAX_SEC );
                    if ( $sec_terms && ! is_wp_error( $sec_terms ) ) {
                        foreach ( $sec_terms as $s ) {
                            echo '<span class="badge badge-lightblue">' . esc_html( $s->name ) . '</span>';
                        }
                    }
                    ?>
                </div>
                <h3>
                    <a href="<?php echo esc_url( $link ); ?>" target="_blank" rel="noopener">
                        <?php the_title(); ?><?php echo wp_kses( $tri_icon, array( 'span' => array( 'class' => array(), 'title' => array() ) ) ); ?>
                    </a>
                </h3>
                <div class="crse-info">
                    Date&nbsp;:
                    <strong>
                        <?php
                        if ( $doc_date ) {
                            echo esc_html( date_i18n( 'd/m/Y', strtotime( $doc_date ) ) );
                        } else {
                            echo esc_html( get_the_date( 'd/m/Y' ) );
                        }
                        ?>
                    </strong>
                </div>
            </article>
            <?php
        }
        
        $pag = paginate_links( array( 
            'base'      => '%_%',
            'format'    => '?paged=%#%',
            'total'     => $query->max_num_pages, 
            'current'   => $paged, 
            'type'      => 'plain', 
            'prev_next' => false 
        ) );
        if ( $pag ) { echo '<div class="crse-pagination">' . wp_kses_post( $pag ) . '</div>'; }
    } else {
        echo '<p class="crse-no-result">Aucun document trouv&eacute;.</p>';
    }

    wp_reset_postdata();
    wp_die();
}

/* ============================================================
   9. AJAX — INFOS CATÉGORIES
   ============================================================ */
add_action( 'wp_ajax_crse_get_cats',        'crse_ajax_get_cats' );
add_action( 'wp_ajax_nopriv_crse_get_cats', 'crse_ajax_get_cats' );

function crse_ajax_get_cats() {
    if ( ! isset( $_POST['nonce'] )
        || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'crse_ajax_nonce' )
    ) {
        wp_send_json_error( 'Accès non autorisé.', 403 );
    }

    $terms = get_terms( array( 'taxonomy' => CRSE_TAX_CAT, 'hide_empty' => true, 'orderby' => 'name', 'order' => 'ASC' ) );
    $data  = array();

    if ( ! is_wp_error( $terms ) && ! empty( $terms ) ) {
        foreach ( $terms as $term ) {
            $latest = get_posts( array(
                'post_type'      => CRSE_POST_TYPE,
                'posts_per_page' => 1,
                'post_status'    => 'publish',
                'tax_query'      => array( array( 'taxonomy' => CRSE_TAX_CAT, 'field' => 'term_id', 'terms' => $term->term_id ) ),
                'meta_query'     => array( array( 'key' => '_crse_sort_key', 'compare' => 'EXISTS' ) ),
                'orderby'        => 'meta_value',
                'meta_key'       => '_crse_sort_key',
                'order'          => 'DESC',
            ) );

            $last_date = '';
            if ( ! empty( $latest ) ) {
                $lpid      = $latest[0]->ID;
                $ld        = get_post_meta( $lpid, '_crse_document_date', true );
                $last_date = $ld ? date_i18n( 'd/m/Y', strtotime( $ld ) ) : get_the_date( 'd/m/Y', $lpid );
            }

            $has_num_posts = get_posts( array(
                'post_type'      => CRSE_POST_TYPE,
                'posts_per_page' => 1,
                'post_status'    => 'publish',
                'fields'         => 'ids',
                'tax_query'      => array( array( 'taxonomy' => CRSE_TAX_CAT, 'field' => 'term_id', 'terms' => $term->term_id ) ),
                'meta_query'     => array(
                    'relation' => 'AND',
                    array( 'key' => '_crse_document_number', 'compare' => 'EXISTS' ),
                    array( 'key' => '_crse_document_number', 'value' => '',          'compare' => '!=' ),
                ),
            ) );

            $data[] = array(
                'term_id'   => intval( $term->term_id ),
                'name'      => $term->name,
                'slug'      => $term->slug,
                'count'     => intval( $term->count ),
                'last_date' => $last_date,
                'has_num'   => ! empty( $has_num_posts ),
            );
        }
    }

    wp_send_json_success( $data );
}

/* ============================================================
   10. SHORTCODE
   ============================================================ */
add_shortcode( 'documents_crse_pro', 'crse_shortcode' );
function crse_shortcode() {
    $nonce = wp_create_nonce( 'crse_ajax_nonce' );
    $sidebar_secs = get_terms( array( 'taxonomy' => CRSE_TAX_SEC, 'hide_empty' => false ) );
    $sidebar_cats = get_terms( array( 'taxonomy' => CRSE_TAX_CAT, 'hide_empty' => false ) );

    ob_start();
    ?>
    <div class="crse-app" id="crse-app">
        <div id="crse-view-home">
            <div id="crse-cats-grid" class="crse-cats-grid">
                <div class="crse-loading">
                    <span class="dashicons dashicons-update crse-spin"></span>&nbsp;Chargement...
                </div>
            </div>
            <div class="crse-home-all-wrap">
                <button id="crse-btn-all" class="crse-btn-all">
                    <span class="dashicons dashicons-list-view"></span>
                    Voir tous les documents
                </button>
            </div>
        </div>

        <div id="crse-view-list" style="display:none;">
            <div class="crse-breadcrumb" id="crse-breadcrumb" style="display:none;">
                <button id="crse-btn-back" class="crse-btn-back">
                    <span class="dashicons dashicons-arrow-left-alt2"></span>
                    <span class="crse-back-label">Catégories</span>
                </button>
                <span class="crse-bc-sep">/</span>
                <span id="crse-bc-label"></span>
            </div>

            <button id="crse-toggle-sidebar" class="crse-mobile-filter-btn" aria-expanded="false" aria-controls="crse-sidebar">
                <span class="dashicons dashicons-filter"></span> Filtres
            </button>

            <div class="crse-layout">
                <aside class="crse-sidebar" id="crse-sidebar" aria-label="Filtres de recherche">
                    <button id="crse-sidebar-close" class="crse-sidebar-close" aria-label="Fermer">
                        <span class="dashicons dashicons-no-alt"></span>
                    </button>

                    <div class="crse-sidebar-header">
                        <span class="dashicons dashicons-filter"></span> Recherche
                    </div>

                    <p class="crse-label">Titre du document</p>
                    <input type="text" id="crse-search" placeholder="Rechercher..." autocomplete="off">

                    <div id="crse-num-wrap">
                        <p class="crse-label">Num&eacute;ro de document</p>
                        <input type="text" id="crse-num-search" placeholder="ex: 2026-001" autocomplete="off">
                    </div>

                    <div class="crse-filter-group">
                        <button class="crse-toggle-btn" type="button" aria-expanded="false" aria-controls="grp-secs">
                            Secteurs <span class="dashicons dashicons-arrow-down-alt2 crse-chevron"></span>
                        </button>
                        <div id="grp-secs" class="crse-filter-body" hidden>
                            <?php
                            if ( ! is_wp_error( $sidebar_secs ) && ! empty( $sidebar_secs ) ) {
                                foreach ( $sidebar_secs as $s ) {
                                    echo '<label class="crse-chk-label">'
                                        . '<input type="checkbox" class="sec-check" value="' . esc_attr( $s->slug ) . '">'
                                        . '<span>' . esc_html( $s->name ) . '</span>'
                                        . '<span class="crse-count">' . intval( $s->count ) . '</span>'
                                        . '</label>';
                                }
                            } else {
                                echo '<p class="crse-empty-filter">Aucun secteur disponible.</p>';
                            }
                            ?>
                        </div>
                    </div>

                    <div class="crse-filter-group" id="crse-grp-cats-wrap">
                        <button class="crse-toggle-btn" type="button" aria-expanded="true" aria-controls="grp-cats">
                            Type de document <span class="dashicons dashicons-arrow-up-alt2 crse-chevron"></span>
                        </button>
                        <div id="grp-cats" class="crse-filter-body">
                            <?php
                            if ( ! is_wp_error( $sidebar_cats ) && ! empty( $sidebar_cats ) ) {
                                foreach ( $sidebar_cats as $t ) {
                                    echo '<label class="crse-chk-label">'
                                        . '<input type="checkbox" class="cat-check" value="' . esc_attr( $t->slug ) . '" data-name="' . esc_attr( $t->name ) . '">'
                                        . '<span>' . esc_html( $t->name ) . '</span>'
                                        . '<span class="crse-count">' . intval( $t->count ) . '</span>'
                                        . '</label>';
                                }
                            }
                            ?>
                        </div>
                    </div>

                    <div class="crse-actions">
                        <button id="crse-btn-filter" type="button">Filtrer</button>
                        <button id="crse-btn-reset"  type="button">Effacer</button>
                    </div>
                </aside>

                <div id="crse-overlay" class="crse-overlay" aria-hidden="true"></div>

                <main class="crse-results">
                    <div class="crse-sort-bar">
                        <label for="crse-sort" id="crse-sort-label">Trier&nbsp;:</label>
                        <select id="crse-sort">
                            <option value="DESC" id="crse-opt-desc">Plus r&eacute;cent (d&eacute;croissant)</option>
                            <option value="ASC"  id="crse-opt-asc">Plus ancien (croissant)</option>
                        </select>
                    </div>
                    <div id="crse-target-list" aria-live="polite">Chargement...</div>
                </main>
            </div>
        </div>
    </div>

    <style>
    #crse-app *, #crse-app *::before, #crse-app *::after { -webkit-box-sizing: border-box; box-sizing: border-box; }
    #crse-app { font-family: "Inter", sans-serif; }
    .crse-cats-grid { display: -webkit-box; display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; gap: 20px; margin-bottom: 28px; }
    .crse-cat-card { background: #fff; border: 1px solid #e0e0e0; border-top: 4px solid #1e4691; border-radius: 12px; padding: 22px 18px 18px; width: calc(33.333% - 14px); cursor: pointer; -webkit-transition: -webkit-transform .2s, -webkit-box-shadow .2s; transition: -webkit-transform .2s, -webkit-box-shadow .2s; transition: transform .2s, box-shadow .2s; transition: transform .2s, box-shadow .2s, -webkit-transform .2s, -webkit-box-shadow .2s; }
    .crse-cat-card:nth-child(3n+2) { border-top-color: #3d98c4; }
    .crse-cat-card:nth-child(3n)   { border-top-color: #4ba1cf; }
    .crse-cat-card:hover { -webkit-transform: translateY(-4px); transform: translateY(-4px); -webkit-box-shadow: 0 8px 24px rgba(30,70,145,.13); box-shadow: 0 8px 24px rgba(30,70,145,.13); }
    .crse-cat-icon { width: 42px; height: 42px; background: #f0f4fb; border-radius: 10px; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center;  -ms-flex-pack: center;  justify-content: center; color: #1e4691; margin-bottom: 14px; }
    .crse-cat-icon .dashicons { font-size: 20px; width: 20px; height: 20px; }
    .crse-cat-name { font-size: 15px; font-weight: 700; color: #1a1a1a; margin: 0 0 10px; line-height: 1.35; }
    .crse-cat-footer { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; -webkit-box-align: center; -ms-flex-align: center; align-items: center; margin-top: 14px; font-size: 12px; color: #888; }
    .crse-cat-count { background: #1e4691; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; white-space: nowrap; }
    .crse-cat-arrow { color: #3d98c4; }
    .crse-home-all-wrap { text-align: center; margin: 10px 0 30px; }
    .crse-btn-all { background: #1e4691; color: #fff; border: none; padding: 13px 28px; border-radius: 30px; font-size: 14px; font-weight: 700; cursor: pointer; display: -webkit-inline-box; display: -ms-inline-flexbox; display: inline-flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; gap: 8px; -webkit-transition: background .2s; transition: background .2s; }
    .crse-btn-all:hover { background: #163579; }
    .crse-loading { color: #888; font-style: italic; font-size: 14px; padding: 20px 0; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; gap: 8px; }
    @-webkit-keyframes crse-spin { to { -webkit-transform: rotate(360deg); transform: rotate(360deg); } }
    @keyframes crse-spin { to { -webkit-transform: rotate(360deg); transform: rotate(360deg); } }
    .crse-spin { display: inline-block; -webkit-animation: crse-spin 1s linear infinite; animation: crse-spin 1s linear infinite; }
    .crse-breadcrumb { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; gap: 10px; margin-bottom: 16px; padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; -ms-flex-wrap: wrap; flex-wrap: wrap; }
    .crse-btn-back { background: none; border: 1px solid #1e4691; color: #1e4691; padding: 6px 14px; border-radius: 20px; cursor: pointer; font-size: 13px; display: -webkit-inline-box; display: -ms-inline-flexbox; display: inline-flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; gap: 4px; -webkit-transition: background .18s, color .18s; transition: background .18s, color .18s; }
    .crse-btn-back:hover { background: #1e4691; color: #fff; }
    .crse-bc-sep { color: #ccc; }
    #crse-bc-label { font-weight: 700; color: #333; }
    .crse-mobile-filter-btn { display: none; background: #1e4691; color: #fff; border: none; padding: 10px 18px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; margin-bottom: 14px; -webkit-box-align: center; -ms-flex-align: center; align-items: center; gap: 6px; -webkit-transition: background .18s; transition: background .18s; }
    .crse-mobile-filter-btn:hover { background: #163579; }
    .crse-layout { display: -webkit-box; display: -ms-flexbox; display: flex; gap: 36px; width: 100%; position: relative; }
    .crse-sidebar { width: 280px; -ms-flex-negative: 0; flex-shrink: 0; position: relative; }
    .crse-sidebar-header { background: #1e4691; color: #fff; padding: 12px 16px; border-radius: 8px; font-weight: 700; margin-bottom: 15px; font-size: 14px; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; gap: 6px; }
    .crse-label { font-size: 12px; margin: 10px 0 5px; font-weight: 700; color: #333; }
    #crse-search, #crse-num-search { width: 100%; padding: 11px 12px; border: 1px solid #ddd; border-radius: 6px; margin-bottom: 14px; font-size: 13px; color: #333; -webkit-transition: border-color .18s; transition: border-color .18s; }
    #crse-search:focus, #crse-num-search:focus { outline: none; border-color: #1e4691; }
    .crse-filter-group { border-top: 1px solid #eee; padding: 14px 0; }
    .crse-toggle-btn { width: 100%; background: none; border: none; padding: 0; font-size: 14px; font-weight: 700; color: #333; cursor: pointer; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; -webkit-box-align: center; -ms-flex-align: center; align-items: center; text-align: left; }
    .crse-toggle-btn:hover { color: #1e4691; }
    .crse-chevron { -webkit-transition: -webkit-transform .2s; transition: -webkit-transform .2s; transition: transform .2s; transition: transform .2s, -webkit-transform .2s; }
    .crse-filter-body { padding-top: 6px; }
    .crse-chk-label { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; gap: 8px; padding: 7px 4px; font-size: 13px; color: #444; cursor: pointer; border-radius: 6px; -webkit-transition: background .12s; transition: background .12s; }
    .crse-chk-label:hover { background: #f5f8ff; }
    .crse-chk-label input { -ms-flex-negative: 0; flex-shrink: 0; accent-color: #1e4691; }
    .crse-chk-label span:first-of-type { -webkit-box-flex: 1; -ms-flex: 1; flex: 1; }
    .crse-count { color: #1e4691; font-weight: 700; font-size: 12px; }
    .crse-empty-filter { font-size: 12px; color: #aaa; font-style: italic; margin: 6px 0 0; }
    .crse-actions { display: -webkit-box; display: -ms-flexbox; display: flex; gap: 10px; margin-top: 20px; }
    #crse-btn-filter { background: #1e4691; color: #fff; border: none; padding: 13px; border-radius: 30px; -webkit-box-flex: 1; -ms-flex: 1; flex: 1; font-weight: 700; cursor: pointer; font-size: 14px; -webkit-transition: background .18s; transition: background .18s; }
    #crse-btn-filter:hover { background: #163579; }
    #crse-btn-reset { background: #fff; color: #444; border: 1px solid #ccc; padding: 13px; border-radius: 30px; -webkit-box-flex: 1; -ms-flex: 1; flex: 1; cursor: pointer; font-size: 14px; -webkit-transition: background .18s; transition: background .18s; }
    #crse-btn-reset:hover { background: #f5f5f5; }
    .crse-sidebar-close { display: none; position: absolute; top: 10px; right: 10px; background: none; border: none; cursor: pointer; color: #888; font-size: 18px; padding: 4px; }
    .crse-sort-bar { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: end; -ms-flex-pack: end; justify-content: flex-end; gap: 8px; margin-bottom: 20px; -ms-flex-wrap: wrap; flex-wrap: wrap; }
    #crse-sort-label { font-size: 13px; color: #555; white-space: nowrap; }
    #crse-sort { padding: 9px 12px; border-radius: 6px; border: 1px solid #ddd; font-size: 13px; color: #333; }
    .crse-results { -webkit-box-flex: 1; -ms-flex-positive: 1; flex-grow: 1; min-width: 0; }
    .crse-result-item { border: 1px solid #e0e0e0; border-radius: 12px; padding: 22px; margin-bottom: 18px; background: #fff; -webkit-transition: -webkit-transform .18s, -webkit-box-shadow .18s; transition: -webkit-transform .18s, -webkit-box-shadow .18s; transition: transform .18s, box-shadow .18s; transition: transform .18s, box-shadow .18s, -webkit-transform .18s, -webkit-box-shadow .18s; }
    .crse-result-item:hover { -webkit-transform: translateY(-2px); transform: translateY(-2px); -webkit-box-shadow: 0 4px 15px rgba(0,0,0,.06); box-shadow: 0 4px 15px rgba(0,0,0,.06); }
    .crse-badges { display: -webkit-box; display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; gap: 6px; }
    .badge { font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 5px 11px; border-radius: 4px; color: #fff; display: inline-block; }
    .badge-num       { background: #111; }
    .badge-blue      { background: #3d98c4; }
    .badge-lightblue { background: #4ba1cf; }
    .crse-result-item h3 { margin: 14px 0 0; }
    .crse-result-item h3 a { color: #1e4691; text-decoration: none; font-size: 1.15rem; display: block; font-weight: 700; line-height: 1.4; }
    .crse-result-item h3 a:hover { text-decoration: underline; }
    .crse-tri-icon { font-size: 13px; vertical-align: middle; opacity: .55; cursor: help; }
    .crse-info { font-size: 12px; color: #777; margin-top: 14px; }
    .crse-no-result { color: #888; font-style: italic; }
    .crse-pagination { display: -webkit-box; display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; gap: 6px; margin-top: 24px; }
    .crse-pagination a, .crse-pagination span { padding: 7px 14px; border: 1px solid #ddd; text-decoration: none; border-radius: 6px; color: #1e4691; font-size: 13px; -webkit-transition: background .15s; transition: background .15s; }
    .crse-pagination a:hover { background: #f0f4fb; }
    .crse-pagination .current { background: #1e4691; color: #fff; border-color: #1e4691; }
    .crse-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 998; -webkit-tap-highlight-color: transparent; }
    @media (max-width: 1100px) { .crse-cat-card { width: calc(50% - 10px); } }
    @media (max-width: 860px) { .crse-sidebar { width: 240px; } .crse-layout  { gap: 20px; } }
    @media (max-width: 720px) {
        .crse-cat-card { width: 100%; }
        .crse-mobile-filter-btn { display: -webkit-inline-box; display: -ms-inline-flexbox; display: inline-flex; }
        .crse-sidebar { position: fixed; top: 0; left: 0; bottom: 0; width: 300px; max-width: 88vw; background: #fff; z-index: 999; overflow-y: auto; padding: 20px 16px 30px; -webkit-transform: translateX(-110%); transform: translateX(-110%); -webkit-transition: -webkit-transform .28s cubic-bezier(.4,0,.2,1); transition: -webkit-transform .28s cubic-bezier(.4,0,.2,1); transition: transform .28s cubic-bezier(.4,0,.2,1); transition: transform .28s cubic-bezier(.4,0,.2,1), -webkit-transform .28s cubic-bezier(.4,0,.2,1); -webkit-box-shadow: 4px 0 20px rgba(0,0,0,.18); box-shadow: 4px 0 20px rgba(0,0,0,.18); }
        .crse-sidebar.crse-sidebar-open { -webkit-transform: translateX(0); transform: translateX(0); }
        .crse-overlay.crse-overlay-show { display: block; }
        .crse-sidebar-close { display: block; }
        .crse-layout  { gap: 0; }
        .crse-results { width: 100%; }
        .crse-sort-bar { -webkit-box-pack: start; -ms-flex-pack: start; justify-content: flex-start; }
        #crse-sort     { width: 100%; }
        .crse-actions { -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column; }
        .crse-result-item { padding: 16px; }
        .crse-result-item h3 a { font-size: 1.05rem; }
    }
    @media (max-width: 400px) { .crse-sidebar { width: 100%; max-width: 100%; } }
    </style>

    <script>
    jQuery(document).ready(function($){
        var ajaxUrl = '<?php echo esc_js( admin_url( 'admin-ajax.php' ) ); ?>';
        var nonce   = '<?php echo esc_js( $nonce ); ?>';
        var MODE          = 'home';
        var catSingleSlug = '';
        var catSingleName = '';
        var catHasNum     = false;

        function showView(id) {
            $('#crse-view-home, #crse-view-list').hide();
            $('#' + id).show();
        }

        function openSidebar() {
            $('#crse-sidebar').addClass('crse-sidebar-open');
            $('#crse-overlay').addClass('crse-overlay-show');
            $('#crse-toggle-sidebar').attr('aria-expanded', 'true');
            $('body').css('overflow', 'hidden');
        }
        function closeSidebar() {
            $('#crse-sidebar').removeClass('crse-sidebar-open');
            $('#crse-overlay').removeClass('crse-overlay-show');
            $('#crse-toggle-sidebar').attr('aria-expanded', 'false');
            $('body').css('overflow', '');
        }
        $('#crse-toggle-sidebar').on('click', openSidebar);
        $('#crse-sidebar-close').on('click',  closeSidebar);
        $('#crse-overlay').on('click',         closeSidebar);

        $('.crse-toggle-btn').on('click', function(){
            var $btn  = $(this);
            var $body = $('#' + $btn.attr('aria-controls'));
            var open  = $body.prop('hidden');
            $body.prop('hidden', !open);
            $btn.attr('aria-expanded', open ? 'true' : 'false');
            $btn.find('.crse-chevron')
                .toggleClass('dashicons-arrow-down-alt2', !open)
                .toggleClass('dashicons-arrow-up-alt2',   open);
        });

        function setSidebarMode() {
            if ( MODE === 'cat' ) {
                $('#crse-grp-cats-wrap').hide();
                $('.cat-check').prop('checked', false);

                if ( catHasNum ) {
                    $('#crse-num-wrap').show();
                    $('#crse-sort-label').text('Trier par num\u00e9ro\u00a0:');
                    $('#crse-opt-desc').text('Plus r\u00e9cent (N\u00b0 d\u00e9croissant)');
                    $('#crse-opt-asc').text('Plus ancien (N\u00b0 croissant)');
                } else {
                    $('#crse-num-wrap').hide();
                    $('#crse-num-search').val('');
                    $('#crse-sort-label').text('Trier par date\u00a0:');
                    $('#crse-opt-desc').text('Plus r\u00e9cent (date d\u00e9croissante)');
                    $('#crse-opt-asc').text('Plus ancien (date croissante)');
                }
            } else {
                $('#crse-grp-cats-wrap').show();
                $('#crse-num-wrap').show();
                $('#crse-sort-label').text('Trier\u00a0:');
                $('#crse-opt-desc').text('Plus r\u00e9cent (d\u00e9croissant)');
                $('#crse-opt-asc').text('Plus ancien (croissant)');
            }
        }

        function openCat(slug, name, hasNum) {
            MODE          = 'cat';
            catSingleSlug = slug;
            catSingleName = name;
            catHasNum     = hasNum;

            $('#crse-bc-label').text(name);
            $('#crse-breadcrumb').show();
            $('#crse-search').val('');
            $('#crse-num-search').val('');
            $('.sec-check').prop('checked', false);
            $('#crse-sort').val('DESC');

            setSidebarMode();
            showView('crse-view-list');
            load(1);
        }

        function openAll() {
            MODE          = 'all';
            catSingleSlug = '';
            catSingleName = '';
            catHasNum     = false;

            $('#crse-breadcrumb').hide();
            $('#crse-search').val('');
            $('#crse-num-search').val('');
            $('.cat-check, .sec-check').prop('checked', false);
            $('#crse-sort').val('DESC');

            setSidebarMode();
            showView('crse-view-list');
            load(1);
        }

        function goHome() {
            MODE          = 'home';
            catSingleSlug = '';
            catSingleName = '';
            catHasNum     = false;
            closeSidebar();
            showView('crse-view-home');
            if ( window.history && window.history.replaceState ) {
                window.history.replaceState({}, '', window.location.pathname);
            }
        }

        function loadCatCards() {
            $.post(ajaxUrl, { action: 'crse_get_cats', nonce: nonce }, function(resp){
                if ( ! resp.success || ! resp.data || ! resp.data.length ) {
                    $('#crse-cats-grid').html('<p style="color:#888;font-style:italic;">Aucune catégorie disponible.</p>');
                    return;
                }
                renderCatCards(resp.data);
            }).fail(function(){
                $('#crse-cats-grid').html('<p style="color:#888;font-style:italic;">Erreur de chargement.</p>');
            });
        }

        function renderCatCards(data) {
            var html = '';
            $.each(data, function(i, cat){
                var last = cat.last_date ? 'Dernier\u00a0: ' + cat.last_date : '\u2014';
                html += '<div class="crse-cat-card" data-slug="' + cat.slug + '" data-name="' + cat.name + '" data-hasnum="' + (cat.has_num ? '1' : '0') + '">'
                      + '<div class="crse-cat-icon"><span class="dashicons dashicons-media-document"></span></div>'
                      + '<div class="crse-cat-name">' + cat.name + '</div>'
                      + '<div class="crse-cat-footer"><span>' + last + '</span>'
                      + '<span class="crse-cat-count">' + cat.count + '\u00a0doc' + (cat.count > 1 ? 's' : '') + '</span></div>'
                      + '<div class="crse-cat-footer" style="margin-top:8px;"><span></span>'
                      + '<span class="crse-cat-arrow dashicons dashicons-arrow-right-alt2"></span></div>'
                      + '</div>';
            });
            $('#crse-cats-grid').html(html);

            $('#crse-cats-grid').off('click.crsecat').on('click.crsecat', '.crse-cat-card', function(){
                var $c    = $(this);
                var hn    = $c.data('hasnum') === 1 || $c.data('hasnum') === '1';
                openCat( $c.data('slug'), $c.data('name'), hn );
            });
        }

        function syncUrl() {
            if ( ! window.history || ! window.history.replaceState ) { return; }
            var up = new URLSearchParams();

            if ( MODE === 'cat' && catSingleSlug ) {
                up.set('cat', catSingleSlug);
            } else if ( MODE === 'all' ) {
                var cats = $('.cat-check:checked').map(function(){ return $(this).val(); }).get();
                if ( cats.length ) { up.set('cats', cats.join(',')); }
            }

            var secs = $('.sec-check:checked').map(function(){ return $(this).val(); }).get();
            var q    = $('#crse-search').val();
            var n    = $('#crse-num-search').val();
            var s    = $('#crse-sort').val();

            if ( secs.length ) { up.set('sect', secs.join(',')); }
            if ( q ) { up.set('q',    q); }
            if ( n ) { up.set('num',  n); }
            if ( s && s !== 'DESC' ) { up.set('sort', s); }

            var qs = up.toString();
            window.history.replaceState(
                {},
                '',
                window.location.pathname + ( qs ? '?' + qs : '' )
            );
        }

        var urlP;
        try { urlP = new URLSearchParams(window.location.search); } catch(e) { urlP = null; }

        if ( urlP ) {
            var catParam  = urlP.get('cat');
            var catsParam = urlP.get('cats');
            var sectParam = urlP.get('sect') || urlP.get('secteur');
            var qParam    = urlP.get('q');
            var numParam  = urlP.get('num');
            var sortParam = urlP.get('sort');

            if ( catParam ) {
                $.post(ajaxUrl, { action: 'crse_get_cats', nonce: nonce }, function(resp){
                    if ( resp.success && resp.data ) { renderCatCards(resp.data); }
                    var found = null;
                    if ( resp.success && resp.data ) {
                        $.each(resp.data, function(i, c){ if ( c.slug === catParam ) { found = c; return false; } });
                    }
                    var hn   = found ? found.has_num : false;
                    var name = found ? found.name    : catParam;

                    MODE          = 'cat';
                    catSingleSlug = catParam;
                    catSingleName = name;
                    catHasNum     = hn;

                    $('#crse-bc-label').text(name);
                    $('#crse-breadcrumb').show();
                    setSidebarMode();

                    if ( sectParam ) {
                        sectParam.split(',').forEach(function(v){ $('.sec-check[value="'+$.trim(v)+'"]').prop('checked', true); });
                    }
                    if ( qParam )   { $('#crse-search').val(qParam); }
                    if ( numParam && hn ) { $('#crse-num-search').val(numParam); }
                    if ( sortParam === 'ASC' || sortParam === 'DESC' ) { $('#crse-sort').val(sortParam); }

                    showView('crse-view-list');
                    load(1);
                });
                return;

            } else if ( catsParam || sectParam || qParam || numParam || sortParam ) {
                MODE = 'all';
                setSidebarMode();
                if ( catsParam ) {
                    catsParam.split(',').forEach(function(v){ $('.cat-check[value="'+$.trim(v)+'"]').prop('checked', true); });
                    $('#grp-cats').prop('hidden', false);
                    $('#crse-grp-cats-wrap .crse-toggle-btn').attr('aria-expanded', 'true');
                }
                if ( sectParam ) {
                    sectParam.split(',').forEach(function(v){ $('.sec-check[value="'+$.trim(v)+'"]').prop('checked', true); });
                }
                if ( qParam )   { $('#crse-search').val(qParam); }
                if ( numParam ) { $('#crse-num-search').val(numParam); }
                if ( sortParam === 'ASC' || sortParam === 'DESC' ) { $('#crse-sort').val(sortParam); }

                showView('crse-view-list');
                load(1);
                loadCatCards();
                return;
            }
        }

        loadCatCards();

        function load(p) {
            p = p || 1;
            var cats = ( MODE === 'all' ) ? $('.cat-check:checked').map(function(){ return $(this).val(); }).get() : [];
            var secs = $('.sec-check:checked').map(function(){ return $(this).val(); }).get();
            var q    = $('#crse-search').val();
            var n    = ( MODE === 'cat' && ! catHasNum ) ? '' : $('#crse-num-search').val();
            var s    = $('#crse-sort').val();

            syncUrl();
            $('#crse-target-list').css('opacity', .5);

            $.post(ajaxUrl, {
                action:     'crse_filter',
                nonce:      nonce,
                search:     q,
                num_search: n,
                cats:       cats,
                secs:       secs,
                cat_single: ( MODE === 'cat' ) ? catSingleSlug : '',
                paged:      p,
                sort:       s
            }, function(res){
                $('#crse-target-list').html(res).css('opacity', 1);
                closeSidebar();
            }).fail(function(){
                $('#crse-target-list').html('<p class="crse-no-result">Erreur de chargement. Veuillez r\u00e9essayer.</p>').css('opacity', 1);
            });
        }

        $('#crse-btn-all').on('click',  openAll);
        $('#crse-btn-back').on('click', goHome);
        $('#crse-btn-filter').on('click', function(){ load(1); });
        $('#crse-sort').on('change',      function(){ load(1); });

        $('#crse-btn-reset').on('click', function(){
            $('.cat-check, .sec-check').prop('checked', false);
            $('#crse-search, #crse-num-search').val('');
            $('#crse-sort').val('DESC');
            load(1);
        });

        $(document).on('click', '.crse-pagination a', function(e){
            e.preventDefault();
            var href = $(this).attr('href') || '';
            var pageMatch = href.match(/[?&]paged=(\d+)/);
            var textPage  = parseInt( $(this).text(), 10 );
            var page      = pageMatch ? parseInt(pageMatch[1], 10) : ( isNaN(textPage) ? 0 : textPage );
            if ( page > 0 ) { load(page); }
        });
    });
    </script>
    <?php
    return ob_get_clean();
}

/* ============================================================
   11. REDIRECTION PDF sécurisée — PHP 5.6+
   ============================================================ */
add_action( 'template_redirect', 'crse_redirect_pdf' );
function crse_redirect_pdf() {
    if ( ! isset( $_GET['view_doc'] ) ) { return; }
    $raw     = sanitize_text_field( wp_unslash( $_GET['view_doc'] ) );
    $decoded = base64_decode( $raw, true );
    if ( false === $decoded ) { return; }
    $id      = absint( $decoded );
    if ( $id <= 0 ) { return; }
    $post    = get_post( $id );
    if ( ! $post || CRSE_POST_TYPE !== $post->post_type || 'publish' !== $post->post_status ) { return; }
    $file_id = get_post_meta( $id, '_crse_doc_id', true );
    if ( ! $file_id ) { return; }
    $url = wp_get_attachment_url( absint( $file_id ) );
    if ( $url ) { wp_redirect( esc_url_raw( $url ), 302 ); exit; }
}

/* ============================================================
   12. API REST — ACCÈS AUX DOCUMENTS ET AUX PDF LIÉS
   Cette extension conserve les contenus, réglages et shortcodes du plugin fourni.
   ============================================================ */
add_action( 'rest_api_init', 'crse_documents_bridge_register_routes' );
add_action( 'init', 'crse_documents_bridge_register_file_meta', 99 );
add_filter( 'allowed_http_origin', 'crse_documents_bridge_allow_local_origins' );

function crse_documents_bridge_register_file_meta() {
	if ( ! function_exists( 'register_post_meta' ) ) {
		return;
	}

	foreach ( array( 'crse_document', 'document' ) as $post_type ) {
		if ( ! post_type_exists( $post_type ) ) {
			continue;
		}

		register_post_meta(
			$post_type,
			'_crse_doc_id',
			array(
				'type'              => 'integer',
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'absint',
				'auth_callback'     => 'crse_documents_bridge_can_edit_file_meta',
			)
		);
	}
}

function crse_documents_bridge_can_edit_file_meta( $allowed, $meta_key, $post_id ) {
	return current_user_can( 'edit_post', $post_id );
}

function crse_documents_bridge_register_routes() {
	register_rest_route(
		'crse/v1',
		'/documents',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'crse_documents_bridge_get_documents',
			'permission_callback' => '__return_true',
			'args'                => array(
				'page'      => array(
					'default'           => 1,
					'sanitize_callback' => 'absint',
				),
				'per_page'  => array(
					'default'           => 100,
					'sanitize_callback' => 'absint',
				),
			),
		)
	);

	register_rest_route(
		'crse/v1',
		'/documents/(?P<id>\d+)/file',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'crse_documents_bridge_serve_pdf',
			'permission_callback' => '__return_true',
			'args'                => array(
				'id'       => array( 'sanitize_callback' => 'absint' ),
				'download' => array( 'sanitize_callback' => 'absint' ),
			),
		)
	);
}

function crse_documents_bridge_get_documents( $request ) {
	$page       = max( 1, min( 100, absint( $request->get_param( 'page' ) ) ) );
	$per_page   = max( 1, min( 100, absint( $request->get_param( 'per_page' ) ) ) );
	$query_limit = $page * $per_page;
	$post_types = array();

	foreach ( array( 'crse_document', 'document' ) as $post_type ) {
		if ( post_type_exists( $post_type ) ) {
			$post_types[] = $post_type;
		}
	}

	if ( empty( $post_types ) ) {
		return new WP_Error(
			'crse_document_post_type_missing',
			'No public CRSE document post type is registered.',
			array( 'status' => 503 )
		);
	}

	$records = array();
	$total   = 0;

	foreach ( $post_types as $post_type ) {
		$query = new WP_Query(
			array(
				'post_type'              => $post_type,
				'post_status'            => 'publish',
				'posts_per_page'         => $query_limit,
				'paged'                  => 1,
				'orderby'                => 'date',
				'order'                  => 'DESC',
				'no_found_rows'          => false,
				'ignore_sticky_posts'    => true,
				'update_post_meta_cache' => true,
				'update_post_term_cache' => true,
			)
		);

		$total += (int) $query->found_posts;
		foreach ( $query->posts as $post ) {
			$records[] = crse_documents_bridge_format_document( $post );
		}
	}

	usort(
		$records,
		function ( $left, $right ) {
			return strcmp( $right['date'], $left['date'] );
		}
	);

	$records = array_slice( $records, ( $page - 1 ) * $per_page, $per_page );
	$response = new WP_REST_Response( $records );
	$response->header( 'X-WP-Total', (string) $total );
	$response->header( 'X-WP-TotalPages', (string) max( 1, (int) ceil( $total / $per_page ) ) );

	return $response;
}

function crse_documents_bridge_format_document( $post ) {
	$post_id  = (int) $post->ID;
	$file     = crse_documents_bridge_find_pdf( $post );
	$classes  = get_post_class( '', $post_id );
	$embedded_terms = array();
	$file_route = ( $file && ! empty( $file['id'] ) )
		? rest_url( 'crse/v1/documents/' . $post_id . '/file' )
		: ( $file ? $file['url'] : null );

	foreach ( get_object_taxonomies( $post->post_type, 'objects' ) as $taxonomy ) {
		$terms = wp_get_post_terms( $post_id, $taxonomy->name );
		if ( is_wp_error( $terms ) || empty( $terms ) ) {
			continue;
		}

		$term_data = array();
		foreach ( $terms as $term ) {
			$classes[] = sanitize_html_class( $taxonomy->name . '-' . $term->slug );
			$term_data[] = array(
				'id'        => (int) $term->term_id,
				'name'      => $term->name,
				'slug'      => $term->slug,
				'taxonomy'  => $taxonomy->name,
			);
		}
		$embedded_terms[] = $term_data;
	}

	$excerpt = get_the_excerpt( $post );
	$date    = get_post_time( 'c', true, $post );

	return array(
		'id'         => $post_id,
		'date'       => $date ? $date : $post->post_date_gmt,
		'slug'       => $post->post_name,
		'type'       => $post->post_type,
		'title'      => array( 'rendered' => get_the_title( $post ) ),
		'link'       => get_permalink( $post ),
		'categories' => array(),
		'class_list' => array_values( array_unique( $classes ) ),
		'excerpt'    => array( 'rendered' => apply_filters( 'the_excerpt', $excerpt ) ),
		'content'    => array( 'rendered' => apply_filters( 'the_content', $post->post_content ) ),
		'file_url'   => $file_route,
		'download_url' => ( $file && ! empty( $file['id'] ) )
			? add_query_arg( 'download', '1', rest_url( 'crse/v1/documents/' . $post_id . '/file' ) )
			: null,
		'file'       => $file,
		'_embedded'  => array( 'wp:term' => $embedded_terms ),
	);
}

function crse_documents_bridge_find_pdf( $post ) {
	$post_id = (int) $post->ID;
	$meta_ids = array(
		get_post_meta( $post_id, '_crse_doc_id', true ),
		get_post_meta( $post_id, '_crse_document_file_id', true ),
		get_post_meta( $post_id, '_crse_file_id', true ),
		get_post_meta( $post_id, 'document_file_id', true ),
	);

	$featured_media_id = get_post_thumbnail_id( $post_id );
	if ( $featured_media_id ) {
		$meta_ids[] = (int) $featured_media_id;
	}

	foreach ( $meta_ids as $attachment_id ) {
		$file = crse_documents_bridge_attachment_data( absint( $attachment_id ) );
		if ( $file ) {
			return $file;
		}
	}

	foreach ( array( '_crse_document_file', 'document_file', 'file_url', 'pdf_url' ) as $meta_key ) {
		$url = get_post_meta( $post_id, $meta_key, true );
		$file = crse_documents_bridge_url_data( $url );
		if ( $file ) {
			return $file;
		}
	}

	$attachments = get_posts(
		array(
			'post_type'      => 'attachment',
			'post_status'    => 'inherit',
			'post_parent'    => $post_id,
			'post_mime_type' => 'application/pdf',
			'posts_per_page' => 1,
			'orderby'        => 'date',
			'order'          => 'DESC',
		)
	);
	if ( ! empty( $attachments ) ) {
		return crse_documents_bridge_attachment_data( $attachments[0]->ID );
	}

	if ( preg_match( '/href\s*=\s*["\']([^"\']+\.pdf(?:\?[^"\']*)?)["\']/i', $post->post_content, $match ) ) {
		return crse_documents_bridge_url_data( html_entity_decode( $match[1], ENT_QUOTES, get_bloginfo( 'charset' ) ) );
	}

	return null;
}

function crse_documents_bridge_attachment_data( $attachment_id ) {
	if ( ! $attachment_id || 'attachment' !== get_post_type( $attachment_id ) ) {
		return null;
	}

	$url = wp_get_attachment_url( $attachment_id );
	if ( ! $url || 'application/pdf' !== get_post_mime_type( $attachment_id ) ) {
		return null;
	}

	$file_path = get_attached_file( $attachment_id );
	return array(
		'id'        => (int) $attachment_id,
		'url'       => esc_url_raw( $url ),
		'mime_type' => 'application/pdf',
		'file_name' => $file_path ? basename( $file_path ) : basename( wp_parse_url( $url, PHP_URL_PATH ) ),
	);
}

function crse_documents_bridge_serve_pdf( $request ) {
	$post_id = absint( $request->get_param( 'id' ) );
	$post    = get_post( $post_id );

	if ( ! $post || 'publish' !== $post->post_status || ! in_array( $post->post_type, array( 'crse_document', 'document' ), true ) ) {
		return new WP_Error( 'crse_document_not_found', 'Document not found.', array( 'status' => 404 ) );
	}

	$file = crse_documents_bridge_find_pdf( $post );
	if ( ! $file || empty( $file['id'] ) ) {
		return new WP_Error( 'crse_pdf_not_found', 'No PDF attachment is linked to this document.', array( 'status' => 404 ) );
	}

	$attachment_id = absint( $file['id'] );
	$file_path     = get_attached_file( $attachment_id );
	$uploads       = wp_upload_dir();
	$upload_root   = realpath( $uploads['basedir'] );
	$real_file     = $file_path ? realpath( $file_path ) : false;

	if (
		'application/pdf' !== get_post_mime_type( $attachment_id )
		|| ! $upload_root
		|| ! $real_file
		|| 0 !== strpos( $real_file, trailingslashit( $upload_root ) )
		|| ! is_file( $real_file )
		|| ! is_readable( $real_file )
	) {
		return new WP_Error( 'crse_pdf_unavailable', 'The linked PDF is unavailable.', array( 'status' => 404 ) );
	}

	$download  = 1 === absint( $request->get_param( 'download' ) );
	$file_name = sanitize_file_name( basename( $real_file ) );

	while ( ob_get_level() ) {
		ob_end_clean();
	}

	status_header( 200 );
	header( 'Content-Type: application/pdf' );
	header( 'Content-Length: ' . (string) filesize( $real_file ) );
	header( 'Content-Disposition: ' . ( $download ? 'attachment' : 'inline' ) . '; filename="' . $file_name . '"' );
	header( 'X-Content-Type-Options: nosniff' );
	header( 'Cache-Control: public, max-age=3600' );
	readfile( $real_file );
	exit;
}

function crse_documents_bridge_url_data( $url ) {
	if ( ! is_string( $url ) || '' === trim( $url ) ) {
		return null;
	}

	$url = esc_url_raw( trim( $url ), array( 'http', 'https' ) );
	if ( ! $url || ! preg_match( '/\.pdf(?:$|[?#])/i', $url ) ) {
		return null;
	}

	return array(
		'id'        => 0,
		'url'       => $url,
		'mime_type' => 'application/pdf',
		'file_name' => basename( wp_parse_url( $url, PHP_URL_PATH ) ),
	);
}

function crse_documents_bridge_allow_local_origins( $origin ) {
	if ( ! is_string( $origin ) || '' === $origin ) {
		return false;
	}

	$host = wp_parse_url( $origin, PHP_URL_HOST );
	if ( in_array( strtolower( (string) $host ), array( 'crse.sn', 'www.crse.sn' ), true ) ) {
		return $origin;
	}

	$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '';
	$document_api = false !== strpos( $request_uri, '/wp-json/crse/v1/documents' );
	if (
		$document_api
		&& preg_match( '#^https?://(localhost|127\.0\.0\.1)(:\d+)?$#i', $origin )
	) {
		return $origin;
	}

	$allowed = apply_filters( 'crse_documents_bridge_allowed_origins', array() );
	if ( in_array( $origin, $allowed, true ) ) {
		return $origin;
	}

	return false;
}
