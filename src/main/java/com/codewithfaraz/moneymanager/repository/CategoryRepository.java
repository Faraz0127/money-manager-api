package com.codewithfaraz.moneymanager.repository;

import com.codewithfaraz.moneymanager.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    // Fetches all categories created by a specific user profile
    //select * from tbl_categories where profile_id = ?1
    List<CategoryEntity> findByProfileId(Long profileId);

    // Fetches a specific category by its ID, ensuring it belongs to the logged-in user
    //select * from tbl_categories where id = ?1 and profile_id = ?2
    Optional<CategoryEntity> findByIdAndProfileId(Long id, Long profileId);

    // Fetches categories for a specific user filtered by category type (e.g., "income" or "expense")
    //select * from tbl_categories where type = ?1 and profile_id = ?2
    List<CategoryEntity> findByTypeAndProfileId(String type, Long profileId);

    // Checks if a category with the same name already exists for a specific user to prevent duplicates
    boolean existsByNameAndProfileId(String name, Long profileId);
}
