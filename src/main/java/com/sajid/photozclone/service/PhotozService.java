package com.sajid.photozclone.service;

import com.sajid.photozclone.model.Photo;
import com.sajid.photozclone.repository.PhotozRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Service
public class PhotozService {
    private final PhotozRepository repo;

    public PhotozService(PhotozRepository repo) {
        this.repo = repo;
    }

    public Iterable<Photo> values() {
        return repo.findAll();
    }

    public Photo get(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public boolean containsKey(Integer id) {
        return repo.existsById(id);
    }

    public void remove(Integer id) {
        repo.deleteById(id);
    }

    public Photo save(MultipartFile file, String title) throws IOException {
        Photo photo = new Photo();
        photo.setFileName(title);
        photo.setContentType(file.getContentType());
        photo.setData(file.getBytes());
        return repo.save(photo);
    }
}
