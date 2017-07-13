package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DevizionApp;
import com.mycompany.myapp.domain.SlidePage;
import com.mycompany.myapp.repository.SlidePageRepository;
import com.mycompany.myapp.service.SlidePageService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SlidePageResource REST controller.
 *
 * @see SlidePageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DevizionApp.class)
public class SlidePageResourceIntTest {

    private static final String DEFAULT_PHOTO_URI = "AAAAAAAAAA";
    private static final String UPDATED_PHOTO_URI = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_CROPPED_PHOTO_URI = "AAAAAAAAAA";
    private static final String UPDATED_CROPPED_PHOTO_URI = "BBBBBBBBBB";

    private static final Boolean DEFAULT_POSITIONED_LEFT = false;
    private static final Boolean UPDATED_POSITIONED_LEFT = true;

    @Autowired
    private SlidePageRepository slidePageRepository;

    @Autowired
    private SlidePageService slidePageService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSlidePageMockMvc;

    private SlidePage slidePage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SlidePageResource slidePageResource = new SlidePageResource(slidePageService);
        this.restSlidePageMockMvc = MockMvcBuilders.standaloneSetup(slidePageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SlidePage createEntity(EntityManager em) {
        SlidePage slidePage = new SlidePage()
            .photoUri(DEFAULT_PHOTO_URI)
            .description(DEFAULT_DESCRIPTION)
            .croppedPhotoUri(DEFAULT_CROPPED_PHOTO_URI)
            .positionedLeft(DEFAULT_POSITIONED_LEFT);
        return slidePage;
    }

    @Before
    public void initTest() {
        slidePage = createEntity(em);
    }

    @Test
    @Transactional
    public void createSlidePage() throws Exception {
        int databaseSizeBeforeCreate = slidePageRepository.findAll().size();

        // Create the SlidePage
        restSlidePageMockMvc.perform(post("/api/slide-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(slidePage)))
            .andExpect(status().isCreated());

        // Validate the SlidePage in the database
        List<SlidePage> slidePageList = slidePageRepository.findAll();
        assertThat(slidePageList).hasSize(databaseSizeBeforeCreate + 1);
        SlidePage testSlidePage = slidePageList.get(slidePageList.size() - 1);
        assertThat(testSlidePage.getPhotoUri()).isEqualTo(DEFAULT_PHOTO_URI);
        assertThat(testSlidePage.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSlidePage.getCroppedPhotoUri()).isEqualTo(DEFAULT_CROPPED_PHOTO_URI);
        assertThat(testSlidePage.isPositionedLeft()).isEqualTo(DEFAULT_POSITIONED_LEFT);
    }

    @Test
    @Transactional
    public void createSlidePageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = slidePageRepository.findAll().size();

        // Create the SlidePage with an existing ID
        slidePage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSlidePageMockMvc.perform(post("/api/slide-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(slidePage)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<SlidePage> slidePageList = slidePageRepository.findAll();
        assertThat(slidePageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPhotoUriIsRequired() throws Exception {
        int databaseSizeBeforeTest = slidePageRepository.findAll().size();
        // set the field null
        slidePage.setPhotoUri(null);

        // Create the SlidePage, which fails.

        restSlidePageMockMvc.perform(post("/api/slide-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(slidePage)))
            .andExpect(status().isBadRequest());

        List<SlidePage> slidePageList = slidePageRepository.findAll();
        assertThat(slidePageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = slidePageRepository.findAll().size();
        // set the field null
        slidePage.setDescription(null);

        // Create the SlidePage, which fails.

        restSlidePageMockMvc.perform(post("/api/slide-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(slidePage)))
            .andExpect(status().isBadRequest());

        List<SlidePage> slidePageList = slidePageRepository.findAll();
        assertThat(slidePageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSlidePages() throws Exception {
        // Initialize the database
        slidePageRepository.saveAndFlush(slidePage);

        // Get all the slidePageList
        restSlidePageMockMvc.perform(get("/api/slide-pages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(slidePage.getId().intValue())))
            .andExpect(jsonPath("$.[*].photoUri").value(hasItem(DEFAULT_PHOTO_URI.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].croppedPhotoUri").value(hasItem(DEFAULT_CROPPED_PHOTO_URI.toString())))
            .andExpect(jsonPath("$.[*].positionedLeft").value(hasItem(DEFAULT_POSITIONED_LEFT.booleanValue())));
    }

    @Test
    @Transactional
    public void getSlidePage() throws Exception {
        // Initialize the database
        slidePageRepository.saveAndFlush(slidePage);

        // Get the slidePage
        restSlidePageMockMvc.perform(get("/api/slide-pages/{id}", slidePage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(slidePage.getId().intValue()))
            .andExpect(jsonPath("$.photoUri").value(DEFAULT_PHOTO_URI.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.croppedPhotoUri").value(DEFAULT_CROPPED_PHOTO_URI.toString()))
            .andExpect(jsonPath("$.positionedLeft").value(DEFAULT_POSITIONED_LEFT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSlidePage() throws Exception {
        // Get the slidePage
        restSlidePageMockMvc.perform(get("/api/slide-pages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSlidePage() throws Exception {
        // Initialize the database
        slidePageService.save(slidePage);

        int databaseSizeBeforeUpdate = slidePageRepository.findAll().size();

        // Update the slidePage
        SlidePage updatedSlidePage = slidePageRepository.findOne(slidePage.getId());
        updatedSlidePage
            .photoUri(UPDATED_PHOTO_URI)
            .description(UPDATED_DESCRIPTION)
            .croppedPhotoUri(UPDATED_CROPPED_PHOTO_URI)
            .positionedLeft(UPDATED_POSITIONED_LEFT);

        restSlidePageMockMvc.perform(put("/api/slide-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSlidePage)))
            .andExpect(status().isOk());

        // Validate the SlidePage in the database
        List<SlidePage> slidePageList = slidePageRepository.findAll();
        assertThat(slidePageList).hasSize(databaseSizeBeforeUpdate);
        SlidePage testSlidePage = slidePageList.get(slidePageList.size() - 1);
        assertThat(testSlidePage.getPhotoUri()).isEqualTo(UPDATED_PHOTO_URI);
        assertThat(testSlidePage.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testSlidePage.getCroppedPhotoUri()).isEqualTo(UPDATED_CROPPED_PHOTO_URI);
        assertThat(testSlidePage.isPositionedLeft()).isEqualTo(UPDATED_POSITIONED_LEFT);
    }

    @Test
    @Transactional
    public void updateNonExistingSlidePage() throws Exception {
        int databaseSizeBeforeUpdate = slidePageRepository.findAll().size();

        // Create the SlidePage

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSlidePageMockMvc.perform(put("/api/slide-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(slidePage)))
            .andExpect(status().isCreated());

        // Validate the SlidePage in the database
        List<SlidePage> slidePageList = slidePageRepository.findAll();
        assertThat(slidePageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSlidePage() throws Exception {
        // Initialize the database
        slidePageService.save(slidePage);

        int databaseSizeBeforeDelete = slidePageRepository.findAll().size();

        // Get the slidePage
        restSlidePageMockMvc.perform(delete("/api/slide-pages/{id}", slidePage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SlidePage> slidePageList = slidePageRepository.findAll();
        assertThat(slidePageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SlidePage.class);
        SlidePage slidePage1 = new SlidePage();
        slidePage1.setId(1L);
        SlidePage slidePage2 = new SlidePage();
        slidePage2.setId(slidePage1.getId());
        assertThat(slidePage1).isEqualTo(slidePage2);
        slidePage2.setId(2L);
        assertThat(slidePage1).isNotEqualTo(slidePage2);
        slidePage1.setId(null);
        assertThat(slidePage1).isNotEqualTo(slidePage2);
    }
}
