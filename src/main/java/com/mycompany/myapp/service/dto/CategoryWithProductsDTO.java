package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.domain.ProductCategory;
import org.springframework.data.domain.Page;

/**
 * Created by Dmitrij on 21.06.2017.
 */
public class CategoryWithProductsDTO {
    private Long id;
    private String categoryName;
    private String categoryPhotoUri;
    private Page<Product> categoryProductsPage;

    public CategoryWithProductsDTO() {
    }

    public static CategoryWithProductsDTO newInstance(ProductCategory productCategory) {
        CategoryWithProductsDTO coppy = new CategoryWithProductsDTO();
        coppy.id = productCategory.getId();
        coppy.categoryName = productCategory.getCategoryName();
        coppy.categoryPhotoUri = productCategory.getCategoryPhotoUri();
        return coppy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryPhotoUri() {
        return categoryPhotoUri;
    }

    public void setCategoryPhotoUri(String categoryPhotoUri) {
        this.categoryPhotoUri = categoryPhotoUri;
    }

    public Page<Product> getCategoryProductsPage() {
        return categoryProductsPage;
    }

    public void setCategoryProductsPage(Page<Product> categoryProductsPage) {
        this.categoryProductsPage = categoryProductsPage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CategoryWithProductsDTO that = (CategoryWithProductsDTO) o;

        if (!id.equals(that.id)) return false;
        if (!categoryName.equals(that.categoryName)) return false;
        if (categoryPhotoUri != null ? !categoryPhotoUri.equals(that.categoryPhotoUri) : that.categoryPhotoUri != null)
            return false;
        return categoryProductsPage != null ? categoryProductsPage.equals(that.categoryProductsPage) : that.categoryProductsPage == null;
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + categoryName.hashCode();
        result = 31 * result + (categoryPhotoUri != null ? categoryPhotoUri.hashCode() : 0);
        result = 31 * result + (categoryProductsPage != null ? categoryProductsPage.hashCode() : 0);
        return result;
    }
}
