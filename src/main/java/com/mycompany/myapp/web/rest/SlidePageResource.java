package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.SlidePage;
import com.mycompany.myapp.service.SlidePageService;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SlidePage.
 */
@RestController
@RequestMapping("/api")
public class SlidePageResource {

    private final Logger log = LoggerFactory.getLogger(SlidePageResource.class);

    private static final String ENTITY_NAME = "slidePage";

    private final SlidePageService slidePageService;

    public SlidePageResource(SlidePageService slidePageService) {
        this.slidePageService = slidePageService;
    }

    /**
     * POST  /slide-pages : Create a new slidePage.
     *
     * @param slidePage the slidePage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new slidePage, or with status 400 (Bad Request) if the slidePage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/slide-pages")
    @Timed
    public ResponseEntity<SlidePage> createSlidePage(@Valid @RequestBody SlidePage slidePage) throws URISyntaxException {
        log.debug("REST request to save SlidePage : {}", slidePage);
        if (slidePage.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new slidePage cannot already have an ID")).body(null);
        }
        SlidePage result = slidePageService.save(slidePage);
        return ResponseEntity.created(new URI("/api/slide-pages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /slide-pages : Updates an existing slidePage.
     *
     * @param slidePage the slidePage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated slidePage,
     * or with status 400 (Bad Request) if the slidePage is not valid,
     * or with status 500 (Internal Server Error) if the slidePage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/slide-pages")
    @Timed
    public ResponseEntity<SlidePage> updateSlidePage(@Valid @RequestBody SlidePage slidePage) throws URISyntaxException {
        log.debug("REST request to update SlidePage : {}", slidePage);
        if (slidePage.getId() == null) {
            return createSlidePage(slidePage);
        }
        SlidePage oldSlide = this.slidePageService.findOne(slidePage.getId());
        String oldPhotoUri = oldSlide.getPhotoUri();
        if (oldPhotoUri != null && !oldPhotoUri.equals(slidePage.getPhotoUri()))
            this.slidePageService.deleteImage(oldPhotoUri);
        SlidePage result = slidePageService.save(slidePage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, slidePage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /slide-pages : get all the slidePages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of slidePages in body
     */
    @GetMapping("/slide-pages")
    @Timed
    public List<SlidePage> getAllSlidePages() {
        log.debug("REST request to get all SlidePages");
        return slidePageService.findAll();
    }

    /**
     * GET  /slide-pages/:id : get the "id" slidePage.
     *
     * @param id the id of the slidePage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the slidePage, or with status 404 (Not Found)
     */
    @GetMapping("/slide-pages/{id}")
    @Timed
    public ResponseEntity<SlidePage> getSlidePage(@PathVariable Long id) {
        log.debug("REST request to get SlidePage : {}", id);
        SlidePage slidePage = slidePageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(slidePage));
    }

    /**
     * DELETE  /slide-pages/:id : delete the "id" slidePage.
     *
     * @param id the id of the slidePage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/slide-pages/{id}")
    @Timed
    public ResponseEntity<Void> deleteSlidePage(@PathVariable Long id) {
        log.debug("REST request to delete SlidePage : {}", id);
        slidePageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
