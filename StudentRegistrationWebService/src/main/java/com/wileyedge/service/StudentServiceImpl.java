package com.wileyedge.service;

import com.wileyedge.model.Student;
import com.wileyedge.dao.StudentDao;
import com.wileyedge.exception.StudentNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

	private StudentDao studentDao;

	@Autowired
	public StudentServiceImpl(StudentDao studentDao) {
		this.studentDao = studentDao;
	}

	@Override
	public Student save(Student student) {
		if (student.getId() != null) {
			throw new IllegalArgumentException("ID must be null for a new student");
		}
		return studentDao.save(student);
	}

	@Override
	public List<Student> findAll() {
		return studentDao.findAll();
	}

	@Override
	public Student findById(Long id) {
		return studentDao.findById(id)
				.orElseThrow(() -> new StudentNotFoundException("Student not found with id " + id));
	}

	@Override
	public List<Student> findByName(String name) {
		return studentDao.findByName(name);
	}

	@Override
	public Student update(Long id, Student updatedStudent) {
		Student existingStudent = studentDao.findById(id)
				.orElseThrow(() -> new StudentNotFoundException("Student not found with id " + id));

		existingStudent.setName(updatedStudent.getName());
		existingStudent.setAge(updatedStudent.getAge());
		existingStudent.setMobile(updatedStudent.getMobile());

		return studentDao.save(existingStudent);
	}

	@Override
	public void deleteById(Long id) {
		if (!studentDao.existsById(id)) {
			throw new StudentNotFoundException("Student not found with id " + id);
		}
		studentDao.deleteById(id);
	}
}
