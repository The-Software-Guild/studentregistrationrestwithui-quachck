package com.wileyedge.service;

import com.wileyedge.model.Student;
import java.util.List;

public interface StudentService {

	Student save(Student student);

	List<Student> findAll();

	Student findById(Long id);

	List<Student> findByName(String name);

	Student update(Long id, Student updatedStudent);

	void deleteById(Long id);
}
