package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.ProductCategoryService;
import com.mycompany.myapp.domain.ProductCategory;
import com.mycompany.myapp.repository.ProductCategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing ProductCategory.
 */
@Service
@Transactional
public class ProductCategoryServiceImpl implements ProductCategoryService{

    private final Logger log = LoggerFactory.getLogger(ProductCategoryServiceImpl.class);
    
    private final ProductCategoryRepository productCategoryRepository;

    public ProductCategoryServiceImpl(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    /**
     * Save a productCategory.
     *
     * @param productCategory the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductCategory save(ProductCategory productCategory) {
        log.debug("Request to save ProductCategory : {}", productCategory);
        ProductCategory result = productCategoryRepository.save(productCategory);
        return result;
    }

    /**
     *  Get all the productCategories.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductCategory> findAll() {
        log.debug("Request to get all ProductCategories");
        List<ProductCategory> result = productCategoryRepository.findAll();

        return result;
    }

    /**
     *  Get one productCategory by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProductCategory findOne(Long id) {
        log.debug("Request to get ProductCategory : {}", id);
        ProductCategory productCategory = productCategoryRepository.findOne(id);
        return productCategory;
    }

    /**
     *  Delete the  productCategory by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductCategory : {}", id);
        productCategoryRepository.delete(id);
    }
}
