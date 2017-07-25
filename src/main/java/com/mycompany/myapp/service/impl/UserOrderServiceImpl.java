package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.UserOrderService;
import com.mycompany.myapp.domain.UserOrder;
import com.mycompany.myapp.repository.UserOrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing UserOrder.
 */
@Service
@Transactional
public class UserOrderServiceImpl implements UserOrderService{

    private final Logger log = LoggerFactory.getLogger(UserOrderServiceImpl.class);
    
    private final UserOrderRepository userOrderRepository;

    public UserOrderServiceImpl(UserOrderRepository userOrderRepository) {
        this.userOrderRepository = userOrderRepository;
    }

    /**
     * Save a userOrder.
     *
     * @param userOrder the entity to save
     * @return the persisted entity
     */
    @Override
    public UserOrder save(UserOrder userOrder) {
        log.debug("Request to save UserOrder : {}", userOrder);
        UserOrder result = userOrderRepository.save(userOrder);
        return result;
    }

    /**
     *  Get all the userOrders.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserOrder> findAll() {
        log.debug("Request to get all UserOrders");
        List<UserOrder> result = userOrderRepository.findAll();

        return result;
    }

    /**
     *  Get one userOrder by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public UserOrder findOne(Long id) {
        log.debug("Request to get UserOrder : {}", id);
        UserOrder userOrder = userOrderRepository.findOne(id);
        return userOrder;
    }

    /**
     *  Delete the  userOrder by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserOrder : {}", id);
        userOrderRepository.delete(id);
    }
}
