package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.UserOrder;
import java.util.List;

/**
 * Service Interface for managing UserOrder.
 */
public interface UserOrderService {

    /**
     * Save a userOrder.
     *
     * @param userOrder the entity to save
     * @return the persisted entity
     */
    UserOrder save(UserOrder userOrder);

    /**
     *  Get all the userOrders.
     *  
     *  @return the list of entities
     */
    List<UserOrder> findAll();

    /**
     *  Get the "id" userOrder.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    UserOrder findOne(Long id);

    /**
     *  Delete the "id" userOrder.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
