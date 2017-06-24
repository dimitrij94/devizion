package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.domain.ProductCategory;
import com.mycompany.myapp.service.ProductService;
import com.mycompany.myapp.service.dto.CategoryWithProductsDTO;
import com.mycompany.myapp.service.ImageService;
import com.mycompany.myapp.service.ProductCategoryService;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

/**
 * REST controller for managing ProductCategory.
 */
@RestController
@RequestMapping("/api")
public class ProductCategoryResource {

    private final Logger log = LoggerFactory.getLogger(ProductCategoryResource.class);
    private final int sizeOfProductsPage = 10;
    private static final String ENTITY_NAME = "productCategory";

    private final ProductCategoryService productCategoryService;
    private final ImageService imageService;
    private final ProductService productService;

    public ProductCategoryResource(ProductCategoryService productCategoryService,
                                   ProductService productService,
                                   ImageService imageService) {
        this.productCategoryService = productCategoryService;
        this.productService = productService;
        this.imageService = imageService;
    }

    /**
     * POST  /product-categories : Create a new productCategory.
     *
     * @param productCategory the productCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productCategory, or with status 400 (Bad Request) if the productCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-categories")
    @Timed
    public ResponseEntity<ProductCategory> createProductCategory(@RequestBody ProductCategory productCategory) throws URISyntaxException {
        log.debug("REST request to save ProductCategory : {}", productCategory);
        if (productCategory.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new productCategory cannot already have an ID")).body(null);
        }
        ProductCategory result = productCategoryService.save(productCategory);
        return ResponseEntity.created(new URI("/api/product-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-categories : Updates an existing productCategory.
     *
     * @param productCategory the productCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productCategory,
     * or with status 400 (Bad Request) if the productCategory is not valid,
     * or with status 500 (Internal Server Error) if the productCategory couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-categories")
    @Timed
    public ResponseEntity<ProductCategory> updateProductCategory(@RequestBody ProductCategory productCategory) throws URISyntaxException {
        log.debug("REST request to update ProductCategory : {}", productCategory);
        if (productCategory.getId() == null) {
            return createProductCategory(productCategory);
        }
        if (productCategory.getCategoryPhotoUri() != null)
            this.imageService.deleteImage("/category/", productCategory.getCategoryPhotoUri());
        ProductCategory result = productCategoryService.save(productCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-categories : get all the productCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productCategories in body
     */
    @GetMapping("/product-categories")
    @Timed
    public List<ProductCategory> getAllProductCategories() {
        log.debug("REST request to get all ProductCategories");
        return productCategoryService.findAll();
    }

    /**
     * GET  /product-categories/:id : get the "id" productCategory.
     *
     * @param id the id of the productCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productCategory, or with status 404 (Not Found)
     */
    @GetMapping(value = "/product-categories/{id}", params = {"includeProducts"})
    @Timed
    public ResponseEntity<CategoryWithProductsDTO> getProductCategory(
        @RequestParam(value = "includeProducts", defaultValue = "false", required = false) boolean includeProducts,
        @RequestParam(value = "page", defaultValue = "0", required = false) int page,
        @PathVariable Long id) {
        log.debug("REST request to get ProductCategory : {}", id);
        ProductCategory productCategory = productCategoryService.findOne(id);
        if (productCategory == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        Page<Product>  categoryProducts = null;
        if (includeProducts) {
            Pageable request = new PageRequest(page, this.sizeOfProductsPage);
            categoryProducts = this.productService.findByCategoryId(productCategory.getId(), request);
        }
        CategoryWithProductsDTO categoryWithProductsDTO = CategoryWithProductsDTO.newInstance(productCategory);
        categoryWithProductsDTO.setCategoryProductsPage(categoryProducts);
        return new ResponseEntity<>(categoryWithProductsDTO, HttpStatus.OK);

    }

    /**
     * GET  /product-categories/:id : get the "id" productCategory.
     *
     * @param includeProducts  include products array for each productCategory to retrieve
     * @param productsPageSize size of list of products in each category
     * @return the ResponseEntity with status 200 (OK) and with body the productCategory, or with status 404 (Not Found)
     */
    @GetMapping(value = "product-categories", params = {"includeProducts", "productsPageSize"})
    public ResponseEntity<CategoryWithProductsDTO[]> getAllProductCategories(
        @RequestParam("includeProducts") boolean includeProducts,
        @RequestParam("productsPageSize") int productsPageSize) {
        log.debug("REST request to get ProductCategory with products pages included: {}");
        Pageable productsPageRequest = new PageRequest(0, productsPageSize);

        List<ProductCategory> productCategories = productCategoryService.findAll();
        CategoryWithProductsDTO[] productCategoryDtos = new CategoryWithProductsDTO[productCategories.size()];
        for (int i = 0; i < productCategories.size(); i++) {
            ProductCategory category = productCategories.get(i);
            Page<Product>  categoryProducts = this.productService.findByCategoryId(category.getId(), productsPageRequest);
            productCategoryDtos[i] = CategoryWithProductsDTO.newInstance(category);
            productCategoryDtos[i].setCategoryProductsPage(categoryProducts);
        }
        return new ResponseEntity<>(productCategoryDtos, HttpStatus.OK);
    }

    /**
     * GET  /product-categories/:id : get the "id" productCategory.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the productCategory, or with status 404 (Not Found)
     */
    @GetMapping(value = "/product-categories/first", params = {"includeProducts"})
    public ResponseEntity<CategoryWithProductsDTO> getFirstProductCategory(
        @RequestParam(value = "includeProducts", defaultValue = "false", required = false) boolean includeProducts) {
        log.debug("REST request to get first ProductCategory : {}");
        ProductCategory productCategory = productCategoryService.getFirst();
        if (productCategory == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        Page<Product> categoryProducts = null;
        if (includeProducts) {
            Pageable request = new PageRequest(0, this.sizeOfProductsPage);
            categoryProducts = this.productService.findByCategoryId(productCategory.getId(), request);
        }
        CategoryWithProductsDTO categoryWithProductsDTO = CategoryWithProductsDTO.newInstance(productCategory);
        categoryWithProductsDTO.setCategoryProductsPage(categoryProducts);
        return new ResponseEntity<>(categoryWithProductsDTO, HttpStatus.OK);
    }

    /**
     * DELETE  /product-categories/:id : delete the "id" productCategory.
     *
     * @param id the id of the productCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductCategory(@PathVariable Long id) {
        log.debug("REST request to delete ProductCategory : {}", id);
        productCategoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
