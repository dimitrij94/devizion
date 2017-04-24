package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.PortfolioEntry;
import com.mycompany.myapp.service.PortfolioEntryService;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PortfolioEntry.
 */
@RestController
@RequestMapping("/api")
public class PortfolioEntryResource {

    private final Logger log = LoggerFactory.getLogger(PortfolioEntryResource.class);

    private static final String ENTITY_NAME = "portfolioEntry";
        
    private final PortfolioEntryService portfolioEntryService;

    public PortfolioEntryResource(PortfolioEntryService portfolioEntryService) {
        this.portfolioEntryService = portfolioEntryService;
    }

    /**
     * POST  /portfolio-entries : Create a new portfolioEntry.
     *
     * @param portfolioEntry the portfolioEntry to create
     * @return the ResponseEntity with status 201 (Created) and with body the new portfolioEntry, or with status 400 (Bad Request) if the portfolioEntry has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/portfolio-entries")
    @Timed
    public ResponseEntity<PortfolioEntry> createPortfolioEntry(@RequestBody PortfolioEntry portfolioEntry) throws URISyntaxException {
        log.debug("REST request to save PortfolioEntry : {}", portfolioEntry);
        if (portfolioEntry.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new portfolioEntry cannot already have an ID")).body(null);
        }
        PortfolioEntry result = portfolioEntryService.save(portfolioEntry);
        return ResponseEntity.created(new URI("/api/portfolio-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /portfolio-entries : Updates an existing portfolioEntry.
     *
     * @param portfolioEntry the portfolioEntry to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated portfolioEntry,
     * or with status 400 (Bad Request) if the portfolioEntry is not valid,
     * or with status 500 (Internal Server Error) if the portfolioEntry couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/portfolio-entries")
    @Timed
    public ResponseEntity<PortfolioEntry> updatePortfolioEntry(@RequestBody PortfolioEntry portfolioEntry) throws URISyntaxException {
        log.debug("REST request to update PortfolioEntry : {}", portfolioEntry);
        if (portfolioEntry.getId() == null) {
            return createPortfolioEntry(portfolioEntry);
        }
        PortfolioEntry result = portfolioEntryService.save(portfolioEntry);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, portfolioEntry.getId().toString()))
            .body(result);
    }

    /**
     * GET  /portfolio-entries : get all the portfolioEntries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of portfolioEntries in body
     */
    @GetMapping("/portfolio-entries")
    @Timed
    public List<PortfolioEntry> getAllPortfolioEntries() {
        log.debug("REST request to get all PortfolioEntries");
        return portfolioEntryService.findAll();
    }

    /**
     * GET  /portfolio-entries/:id : get the "id" portfolioEntry.
     *
     * @param id the id of the portfolioEntry to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the portfolioEntry, or with status 404 (Not Found)
     */
    @GetMapping("/portfolio-entries/{id}")
    @Timed
    public ResponseEntity<PortfolioEntry> getPortfolioEntry(@PathVariable Long id) {
        log.debug("REST request to get PortfolioEntry : {}", id);
        PortfolioEntry portfolioEntry = portfolioEntryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(portfolioEntry));
    }

    /**
     * DELETE  /portfolio-entries/:id : delete the "id" portfolioEntry.
     *
     * @param id the id of the portfolioEntry to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/portfolio-entries/{id}")
    @Timed
    public ResponseEntity<Void> deletePortfolioEntry(@PathVariable Long id) {
        log.debug("REST request to delete PortfolioEntry : {}", id);
        portfolioEntryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
