package com.wileyedge.dao;

import com.wileyedge.model.Student;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentDao extends JpaRepository<Student, Long> {
	List<Student> findByName(String name);
}