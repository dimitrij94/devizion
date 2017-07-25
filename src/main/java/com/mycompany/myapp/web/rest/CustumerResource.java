package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Custumer;
import com.mycompany.myapp.service.CustumerService;
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
 * REST controller for managing Custumer.
 */
@RestController
@RequestMapping("/api")
public class CustumerResource {

    private final Logger log = LoggerFactory.getLogger(CustumerResource.class);

    private static final String ENTITY_NAME = "custumer";
        
    private final CustumerService custumerService;

    public CustumerResource(CustumerService custumerService) {
        this.custumerService = custumerService;
    }

    /**
     * POST  /custumers : Create a new custumer.
     *
     * @param custumer the custumer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new custumer, or with status 400 (Bad Request) if the custumer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/custumers")
    @Timed
    public ResponseEntity<Custumer> createCustumer(@Valid @RequestBody Custumer custumer) throws URISyntaxException {
        log.debug("REST request to save Custumer : {}", custumer);
        if (custumer.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new custumer cannot already have an ID")).body(null);
        }
        Custumer result = custumerService.save(custumer);
        return ResponseEntity.created(new URI("/api/custumers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /custumers : Updates an existing custumer.
     *
     * @param custumer the custumer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated custumer,
     * or with status 400 (Bad Request) if the custumer is not valid,
     * or with status 500 (Internal Server Error) if the custumer couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/custumers")
    @Timed
    public ResponseEntity<Custumer> updateCustumer(@Valid @RequestBody Custumer custumer) throws URISyntaxException {
        log.debug("REST request to update Custumer : {}", custumer);
        if (custumer.getId() == null) {
            return createCustumer(custumer);
        }
        Custumer result = custumerService.save(custumer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, custumer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /custumers : get all the custumers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of custumers in body
     */
    @GetMapping("/custumers")
    @Timed
    public List<Custumer> getAllCustumers() {
        log.debug("REST request to get all Custumers");
        return custumerService.findAll();
    }

    /**
     * GET  /custumers/:id : get the "id" custumer.
     *
     * @param id the id of the custumer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the custumer, or with status 404 (Not Found)
     */
    @GetMapping("/custumers/{id}")
    @Timed
    public ResponseEntity<Custumer> getCustumer(@PathVariable Long id) {
        log.debug("REST request to get Custumer : {}", id);
        Custumer custumer = custumerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(custumer));
    }

    /**
     * DELETE  /custumers/:id : delete the "id" custumer.
     *
     * @param id the id of the custumer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/custumers/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustumer(@PathVariable Long id) {
        log.debug("REST request to delete Custumer : {}", id);
        custumerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
