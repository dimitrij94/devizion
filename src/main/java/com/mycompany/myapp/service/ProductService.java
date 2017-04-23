package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.ImageToken;
import com.mycompany.myapp.domain.Product;
import java.util.List;

/**
 * Service Interface for managing Product.
 */
public interface ProductService {

    /**
     * Save a product.
     *
     * @param product the entity to save
     * @return the persisted entity
     */
    Product save(Product product);

    /**
     *  Get all the products.
     *
     *  @return the list of entities
     */
    List<Product> findAll();

    /**
     *  Get the "id" product.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Product findOne(Long id);

    /**
     *  Delete the "id" product.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    ImageToken saveImageToken(String fileName);
}
