package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.ImageToken;
import com.mycompany.myapp.service.ImageTokenService;
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
 * REST controller for managing ImageToken.
 */
@RestController
@RequestMapping("/api")
public class ImageTokenResource {

    private final Logger log = LoggerFactory.getLogger(ImageTokenResource.class);

    private static final String ENTITY_NAME = "imageToken";
        
    private final ImageTokenService imageTokenService;

    public ImageTokenResource(ImageTokenService imageTokenService) {
        this.imageTokenService = imageTokenService;
    }

    /**
     * POST  /image-tokens : Create a new imageToken.
     *
     * @param imageToken the imageToken to create
     * @return the ResponseEntity with status 201 (Created) and with body the new imageToken, or with status 400 (Bad Request) if the imageToken has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/image-tokens")
    @Timed
    public ResponseEntity<ImageToken> createImageToken(@Valid @RequestBody ImageToken imageToken) throws URISyntaxException {
        log.debug("REST request to save ImageToken : {}", imageToken);
        if (imageToken.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new imageToken cannot already have an ID")).body(null);
        }
        ImageToken result = imageTokenService.save(imageToken);
        return ResponseEntity.created(new URI("/api/image-tokens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /image-tokens : Updates an existing imageToken.
     *
     * @param imageToken the imageToken to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated imageToken,
     * or with status 400 (Bad Request) if the imageToken is not valid,
     * or with status 500 (Internal Server Error) if the imageToken couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/image-tokens")
    @Timed
    public ResponseEntity<ImageToken> updateImageToken(@Valid @RequestBody ImageToken imageToken) throws URISyntaxException {
        log.debug("REST request to update ImageToken : {}", imageToken);
        if (imageToken.getId() == null) {
            return createImageToken(imageToken);
        }
        ImageToken result = imageTokenService.save(imageToken);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, imageToken.getId().toString()))
            .body(result);
    }

    /**
     * GET  /image-tokens : get all the imageTokens.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of imageTokens in body
     */
    @GetMapping("/image-tokens")
    @Timed
    public List<ImageToken> getAllImageTokens() {
        log.debug("REST request to get all ImageTokens");
        return imageTokenService.findAll();
    }

    /**
     * GET  /image-tokens/:id : get the "id" imageToken.
     *
     * @param id the id of the imageToken to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imageToken, or with status 404 (Not Found)
     */
    @GetMapping("/image-tokens/{id}")
    @Timed
    public ResponseEntity<ImageToken> getImageToken(@PathVariable Long id) {
        log.debug("REST request to get ImageToken : {}", id);
        ImageToken imageToken = imageTokenService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(imageToken));
    }

    /**
     * DELETE  /image-tokens/:id : delete the "id" imageToken.
     *
     * @param id the id of the imageToken to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/image-tokens/{id}")
    @Timed
    public ResponseEntity<Void> deleteImageToken(@PathVariable Long id) {
        log.debug("REST request to delete ImageToken : {}", id);
        imageTokenService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
