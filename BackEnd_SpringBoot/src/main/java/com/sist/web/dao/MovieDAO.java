package com.sist.web.dao;

import java.util.List;

import com.sist.web.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieDAO extends JpaRepository<MovieEntity, Integer> {

    @Query(value="select * from movie "
            + "limit 0,9", nativeQuery = true)
    public List<MovieEntity> MovieTop9();
}
