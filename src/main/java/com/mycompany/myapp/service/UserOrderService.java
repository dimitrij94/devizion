package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.UserOrder;
import com.mycompany.myapp.service.dto.user_order.UserOrderPortfolioDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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
     * Get all the userOrders.
     *
     * @return the list of entities
     */
    List<UserOrder> findAll();


    Page<UserOrder> findAll(Pageable pageable);

    Page<UserOrderPortfolioDto> findAllPortfolios(Pageable pageable);


    /**
     * Get the "id" userOrder.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UserOrder findOne(Long id);

    /**
     * Delete the "id" userOrder.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    Page<UserOrder> findAllByProductId(Pageable pageable, Long productId);

    UserOrderPortfolioDto findOnePortfolio(Long portfolioId);

    Page<UserOrderPortfolioDto> findAllPortfoliosByProductId(PageRequest pageRequest, long productId);
}
