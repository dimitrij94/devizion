package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.UserOrder;
import com.mycompany.myapp.service.UserOrderService;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserOrder.
 */
@RestController
@RequestMapping("/api")
public class UserOrderResource {

    private final Logger log = LoggerFactory.getLogger(UserOrderResource.class);

    private static final String ENTITY_NAME = "userOrder";

    private final UserOrderService userOrderService;

    public UserOrderResource(UserOrderService userOrderService) {
        this.userOrderService = userOrderService;
    }

    /**
     * POST  /user-orders : Create a new userOrder.
     *
     * @param userOrder the userOrder to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userOrder, or with status 400 (Bad Request) if the userOrder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-orders")
    @Timed
    public ResponseEntity<UserOrder> createUserOrder(@RequestBody UserOrder userOrder) throws URISyntaxException {
        log.debug("REST request to save UserOrder : {}", userOrder);
        if (userOrder.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new userOrder cannot already have an ID")).body(null);
        }
        UserOrder result = userOrderService.save(userOrder);
        return ResponseEntity.created(new URI("/api/user-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-orders : Updates an existing userOrder.
     *
     * @param userOrder the userOrder to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userOrder,
     * or with status 400 (Bad Request) if the userOrder is not valid,
     * or with status 500 (Internal Server Error) if the userOrder couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */


    @PutMapping("/user-orders")
    @Timed
    public ResponseEntity<UserOrder> updateUserOrder(@RequestBody UserOrder userOrder) throws URISyntaxException {
        log.debug("REST request to update UserOrder : {}", userOrder);
        if (userOrder.getId() == null) {
            return createUserOrder(userOrder);
        }
        UserOrder result = userOrderService.save(userOrder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userOrder.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-orders : get all the userOrders.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userOrders in body
     */
    @GetMapping("/user-orders")
    @Timed
    public List<UserOrder> getAllUserOrders() {
        log.debug("REST request to get all UserOrders");
        return userOrderService.findAll();
    }


    /**
     * GET  /user-orders/:id : get the "id" userOrder.
     *
     * @param id the id of the userOrder to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userOrder, or with status 404 (Not Found)
     */
    @GetMapping("/user-orders/{id}")
    @Timed
    public ResponseEntity<UserOrder> getUserOrder(@PathVariable Long id) {
        log.debug("REST request to get UserOrder : {}", id);
        UserOrder userOrder = userOrderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userOrder));
    }

    @GetMapping(value = "/user-orders", params = {"productId", "page", "size"})
    public ResponseEntity<Page<UserOrder>> getUserOrdersOfProduct(@RequestParam("productId") Long id,
                                                                  @RequestParam("page") int page,
                                                                  @RequestParam("size") int size) {
        log.debug("REST request to get UserOrder of product with id: {}", id);
        Page<UserOrder> userOrderPage = userOrderService.findAllByProductId(new PageRequest(page, size), id);
        if (!userOrderPage.hasContent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(userOrderPage, HttpStatus.OK);
    }

    @GetMapping(value = "/user-orders", params = {"categoryId"})
    public ResponseEntity<Page<UserOrder>> getUserOrdersOfCategory(@RequestParam("categoryId") Long id,
                                                                   @RequestParam("page") int page,
                                                                   @RequestParam("size") int size) {
        log.debug("REST request to get UserOrder of category with id: {}", id);
        Page<UserOrder> userOrderPage = userOrderService.findAllByCategoryId(id, new PageRequest(page, size));
        return new ResponseEntity<>(userOrderPage, HttpStatus.OK);
    }

    /**
     * DELETE  /user-orders/:id : delete the "id" userOrder.
     *
     * @param id the id of the userOrder to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-orders/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserOrder(@PathVariable Long id) {
        log.debug("REST request to delete UserOrder : {}", id);
        userOrderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
