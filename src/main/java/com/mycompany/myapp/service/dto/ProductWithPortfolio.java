package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.domain.ProductCategory;
import com.mycompany.myapp.domain.UserOrder;
import org.springframework.data.domain.Page;

/**
 * Created by Dmitrij on 29.06.2017.
 */
public class ProductWithPortfolio {
    private Long id;
    private String productName;
    private Float productPrice;
    private String productDescription;
    private String productImageUri;
    private String croppedImageUri;
    private Float productSelfCost;
    private Page<UserOrder> categoryProductsPage;
    private ProductCategory productCategory;

    public ProductWithPortfolio() {
    }

    public ProductWithPortfolio(Product product) {
        this.id = product.getId();
        this.productName = product.getProductName();
        this.productPrice = product.getProductPrice();
        this.productDescription = product.getProductDescription();
        this.productImageUri = product.getProductImageUri();
        this.croppedImageUri = product.getCroppedImageUri();
        this.productCategory = product.getProductCategory();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Float getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Float productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public String getProductImageUri() {
        return productImageUri;
    }

    public void setProductImageUri(String productImageUri) {
        this.productImageUri = productImageUri;
    }

    public String getCroppedImageUri() {
        return croppedImageUri;
    }

    public void setCroppedImageUri(String croppedImageUri) {
        this.croppedImageUri = croppedImageUri;
    }

    public Float getProductSelfCost() {
        return productSelfCost;
    }

    public void setProductSelfCost(Float productSelfCost) {
        this.productSelfCost = productSelfCost;
    }

    public Page<UserOrder> getCategoryProductsPage() {
        return categoryProductsPage;
    }

    public void setCategoryProductsPage(Page<UserOrder> categoryProductsPage) {
        this.categoryProductsPage = categoryProductsPage;
    }

    public ProductCategory getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(ProductCategory productCategory) {
        this.productCategory = productCategory;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductWithPortfolio that = (ProductWithPortfolio) o;

        if (!id.equals(that.id)) return false;
        if (productName != null ? !productName.equals(that.productName) : that.productName != null) return false;
        if (productPrice != null ? !productPrice.equals(that.productPrice) : that.productPrice != null) return false;
        if (productDescription != null ? !productDescription.equals(that.productDescription) : that.productDescription != null)
            return false;
        if (productImageUri != null ? !productImageUri.equals(that.productImageUri) : that.productImageUri != null)
            return false;
        if (croppedImageUri != null ? !croppedImageUri.equals(that.croppedImageUri) : that.croppedImageUri != null)
            return false;
        return productSelfCost != null ? productSelfCost.equals(that.productSelfCost) : that.productSelfCost == null;
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + (productName != null ? productName.hashCode() : 0);
        result = 31 * result + (productPrice != null ? productPrice.hashCode() : 0);
        result = 31 * result + (productDescription != null ? productDescription.hashCode() : 0);
        result = 31 * result + (productImageUri != null ? productImageUri.hashCode() : 0);
        result = 31 * result + (croppedImageUri != null ? croppedImageUri.hashCode() : 0);
        result = 31 * result + (productSelfCost != null ? productSelfCost.hashCode() : 0);
        return result;
    }
}
