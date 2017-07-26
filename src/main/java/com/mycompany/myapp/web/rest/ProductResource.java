package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.domain.UserOrder;
import com.mycompany.myapp.service.ImageService;
import com.mycompany.myapp.service.ProductService;
import com.mycompany.myapp.service.UserOrderService;
import com.mycompany.myapp.service.dto.ProductWithPortfolio;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Product.
 */
@RestController
@RequestMapping("/api/products")
public class ProductResource {
    private final int productsPageSize = 20;

    private final Logger log = LoggerFactory.getLogger(ProductResource.class);

    private static final String ENTITY_NAME = "product";

    private final ProductService productService;
    private final ImageService imageService;
    private final UserOrderService userOrderService;

    public ProductResource(ProductService productService, ImageService imageService, UserOrderService userOrderService) {
        this.productService = productService;
        this.imageService = imageService;
        this.userOrderService = userOrderService;
    }

    /**
     * POST  /products : Create a new product.
     *
     * @param product the product to create
     * @return the ResponseEntity with status 201 (Created) and with body the new product, or with status 400 (Bad Request) if the product has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */

    @PostMapping()
    @Timed
    public ResponseEntity<Product> createProduct(@RequestParam(name = "token_id", required = false) Long tokenId, @Valid @RequestBody Product product) throws URISyntaxException {
        log.debug("REST request to save Product : {}", product);
        if (tokenId != null)

            if (product.getId() != null) {
                return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new product cannot already have an ID")).body(null);
            }
        Product result = productService.save(product);
        return ResponseEntity.created(new URI("/api/products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }


    /**
     * PUT  /products : Updates an existing product.
     *
     * @param product the product to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated product,
     * or with status 400 (Bad Request) if the product is not valid,
     * or with status 500 (Internal Server Error) if the product couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping()
    @Timed
    public ResponseEntity<Product> updateProduct(@RequestParam(name = "token_id", required = false) Long tokenId,
                                                 @Valid @RequestBody Product product) throws URISyntaxException {
        log.debug("REST request to update Product : {}", product);

        if (product.getId() == null) {
            return createProduct(tokenId, product);
        }

        Product oldProduct = this.productService.findOne(product.getId());

        String productImageUri = product.getProductImageUri();
        if (productImageUri != null && !productImageUri.equals(oldProduct.getProductImageUri()))
            this.imageService.deleteImage("/product/", productImageUri);

        Product result = productService.save(product);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, product.getId().toString()))
            .body(result);
    }

    /**
     * GET  /products : get all the products.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of products in body
     */
    @GetMapping()
    @Timed
    public List<Product> getAllProducts() {
        log.debug("REST request to get all Products");
        return productService.findAll();
    }

    /**
     * GET  /products/:id : get the "id" product.
     *
     * @param categoryId the id of the product category to find by;
     * @param page       the page of the
     * @return the ResponseEntity with status 200 (OK) and with body the products Page, or with status 404 (Not Found)
     */
    @GetMapping(params = {"categoryId"})
    @Timed
    public ResponseEntity<Page<Product>> getProduct(
        @RequestParam(value = "page", defaultValue = "0", required = false) int page,
        @RequestParam(value = "size", defaultValue = "20", required = false) int size,
        @RequestParam(value = "categoryId") Long categoryId) {
        log.debug("REST request to get Product : {}", categoryId);
        Page<Product> productsPage = productService.findByCategoryId(categoryId, new PageRequest(page, size));
        return new ResponseEntity<>(productsPage, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}", params = {"page", "pageSize", "includePortfolio"})
    public ResponseEntity<ProductWithPortfolio> getProductWithPortfolio(@PathVariable("id") Long id,
                                                                        @RequestParam(value = "page", defaultValue = "1") int page,
                                                                        @RequestParam(value = "pageSize", defaultValue = "20") int pageSize,
                                                                        @RequestParam("includePortfolio") boolean includePortfolio) {
        log.debug("REST request to get Product with Portfolio: {}", id);
        Product product = this.productService.findOne(id);
        if (product != null) {
            ProductWithPortfolio productWithPortfolio = new ProductWithPortfolio(product);
            if (includePortfolio) {
                Page<UserOrder> userOrders = this.userOrderService.findAllByProductId(new PageRequest(page, pageSize), id);
                productWithPortfolio.setCategoryProductsPage(userOrders);
            }
            return new ResponseEntity<>(productWithPortfolio, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * GET  /products/:id : get the "id" product.
     *
     * @param id the id of the product to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the product, or with status 404 (Not Found)
     */
    @GetMapping("/{id}")
    @Timed
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        log.debug("REST request to get Product : {}", id);
        Product product = productService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(product));
    }


    /**
     * DELETE  /products/:id : delete the "id" product.
     *
     * @param id the id of the product to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/{id}")
    @Timed
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        log.debug("REST request to delete Product : {}", id);
        Product product = productService.findOne(id);
        String photoUri = product.getProductImageUri();
        if (photoUri != null) this.imageService.deleteImage("/product/", photoUri);

        productService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }


}
