package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.SlidePage;
import com.mycompany.myapp.service.SlidePageService;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

/**
 * Created by Dmitrij on 10.07.2017.
 */
@RestController()
@RequestMapping("/api/slide")
public class SlidePageResource {
    private String ENTITY_NAME = "SlidePage";
    private final Logger log = LoggerFactory.getLogger(UserOrderResource.class);

    SlidePageService slidePageService;

    public SlidePageResource(SlidePageService slidePageService) {
        this.slidePageService = slidePageService;
    }

    @PutMapping()
    public ResponseEntity<SlidePage> update(@RequestBody SlidePage slidePage) throws URISyntaxException {
        log.debug("REST request to update SlidePage : {}", slidePage);
        if (slidePage.getId() == null) {
            return this.createSlidePage(slidePage);
        }
        SlidePage result = this.slidePageService.save(slidePage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, slidePage.getId().toString()))
            .body(slidePage);
    }

    @PostMapping
    private ResponseEntity<SlidePage> createSlidePage(@RequestBody SlidePage slidePage) throws URISyntaxException {
        log.debug("REST request to save Custumer : {}", slidePage);
        if (slidePage.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new custumer cannot already have an ID")).body(null);
        }
        SlidePage result = slidePageService.save(slidePage);
        return ResponseEntity.created(new URI("/api/slide/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SlidePage> find(@PathVariable("id") Long id) {
        this.log.debug("enter find slide by id : {}", id);
        SlidePage page = this.slidePageService.find(id);
        if (page != null)
            return new ResponseEntity<>(page, HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public List<SlidePage> findAll() {
        this.log.debug("enter find all slides: {}");
        return this.slidePageService.query();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        log.debug("REST request to delete Slide Page : {}", id);
        this.slidePageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();

    }


}
