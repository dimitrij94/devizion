package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.ImageToken;
import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.repository.ProductRepository;
import com.mycompany.myapp.service.ImageTokenService;
import com.mycompany.myapp.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * Service Implementation for managing Product.
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private ImageTokenService imageTokenService;

    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository, ImageTokenService imageTokenService) {
        this.productRepository = productRepository;
        this.imageTokenService = imageTokenService;
    }

    /**
     * Save a product.
     *
     * @param product the entity to save
     * @return the persisted entity
     */
    @Override
    public Product save(Product product) {
        log.debug("Request to save Product : {}", product);
        Product result = productRepository.save(product);
        return result;
    }

    /**
     * Get all the products.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Product> findAll() {
        log.debug("Request to get all Products");
        List<Product> result = productRepository.findAll();

        return result;
    }

    /**
     * Get one product by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Product findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        Product product = productRepository.findOne(id);
        return product;
    }

    /**
     * Delete the  product by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        productRepository.delete(id);
    }

    @Override
    public ImageToken saveImageToken(String fileName) {
        String filePath = "/products/" + fileName;
        ImageToken token = new ImageToken(filePath);
        return this.imageTokenService.save(token);
    }

    @Override
    public Set<Product> findByCategoryId(Long id) {
        return productRepository.findByProductCategoryId(id);
    }

    @Override
    public Page<Product> findByCategoryId(Long categoryId, Pageable pageRequest) {
        return productRepository.findByProductCategoryId(categoryId, pageRequest);
    }
}
