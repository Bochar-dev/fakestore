"use client";

import "./style.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import stabImage from "@/public/static-images/stub.png";
import FormInput from "../FormInput/FormInput";
import FormTextarea from "../FormTextarea/FormTextarea";
import FormSelect from "../FormSelect/FormSelect";
import FormInputFile from "../FormInputFile/FormInputFile";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fetchCategories } from "@/store/slices/categories/api-actions";
import { categoriesSelector } from "@/store/slices/categories/selectors";
import { productAddAction } from "@/store/slices/product/api-actions";
import { productSelector } from "@/store/slices/product/selectors";
import { unSucces } from "@/store/slices/product/reducer";

const AddForm = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { categories } = useAppSelector(categoriesSelector);
  const { isSucces } = useAppSelector(productSelector);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [blobImage, setBlobImage] = useState("");

  const titleChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  };

  const priceChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setPrice(evt.target.value);
  };

  const descriptionChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(evt.target.value);
  };

  const categoryChanheHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
    setCategory(evt.target.value);
  };

  const imageChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = evt.target.files ? evt.target.files[0] : null;

    if (file) {
      const blob = URL.createObjectURL(file);
      setBlobImage(blob);
      setImage(evt.target.value);
    }
  };

  const formSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const newProduct = {
      title: title,
      price: price,
      description: description,
      image: image,
      category: category,
    };

    dispatch(productAddAction({ ...newProduct }));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isSucces) {
      router.push("/products");
      dispatch(unSucces());
    }
  }, [isSucces, router, dispatch]);

  return (
    <div className="add">
      <Image
        className="add__image"
        src={blobImage ? blobImage : stabImage}
        alt={""}
        width={500}
        height={500}
      />
      <form className="add__form" onSubmit={formSubmitHandler}>
        <div className="add__form-fielset">
          <label className="add__form-label">
            <span>Название: </span>
            <FormInput
              type="text"
              value={title}
              onChange={titleChangeHandler}
              required
            />
          </label>
          <label className="add__form-label">
            <span>Цена: </span>
            <FormInput
              type="number"
              value={price}
              onChange={priceChangeHandler}
              required
            />
          </label>
          <label className="add__form-label">
            <span>Описание: </span>
            <FormTextarea
              value={description}
              onChange={descriptionChangeHandler}
              required
            />
          </label>
          <label className="add__form-label">
            <span>Категория: </span>
            <FormSelect
              options={categories}
              selected={category}
              onChange={categoryChanheHandler}
              required
            />
          </label>
          <label className="add__form-label">
            <span>Фото: </span>
            <FormInputFile
              accept=".jpg,.png"
              onChange={imageChangeHandler}
              required
            />
          </label>
        </div>
        <Button className="add__form-button" type="submit">
          Отправить
        </Button>
      </form>
    </div>
  );
};

export default AddForm;
