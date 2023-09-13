"use client";

import "./style.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import Image from "next/image";
import FormInput from "../FormInput/FormInput";
import FormTextarea from "../FormTextarea/FormTextarea";
import FormSelect from "../FormSelect/FormSelect";
import FormInputFile from "../FormInputFile/FormInputFile";
import Button from "../Button/Button";
import { productSelector } from "@/store/slices/product/selectors";
import { categoriesSelector } from "@/store/slices/categories/selectors";
import { unSave } from "@/store/slices/product/reducer";
import {
  fetchProductAction,
  productDeleteAction,
  productEditAction,
} from "@/store/slices/product/api-actions";
import { fetchCategories } from "@/store/slices/categories/api-actions";

type EditFormProps = {
  productId: string;
};

const EditForm = ({ productId }: EditFormProps) => {
  const dispatch = useAppDispatch();

  const { product, isLoading, isSave, isDeleted } =
    useAppSelector(productSelector);
  const { categories } = useAppSelector(categoriesSelector);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [blobImage, setBlobImage] = useState("");

  const titleChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
    dispatch(unSave());
  };

  const priceChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setPrice(evt.target.value);
    dispatch(unSave());
  };

  const descriptionChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(evt.target.value);
    dispatch(unSave());
  };

  const categoryChanheHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
    setCategory(evt.target.value);
    dispatch(unSave());
  };

  const imageChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = evt.target.files ? evt.target.files[0] : null;
    dispatch(unSave());

    if (file) {
      const blob = URL.createObjectURL(file);
      setBlobImage(blob);
      setImage(evt.target.value);
    }
  };

  const formSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const updateProduct = {
      title: title,
      price: price,
      description: description,
      image: image,
      category: category,
    };

    dispatch(
      productEditAction({
        id: productId,
        updateProduct: updateProduct,
      })
    );
  };

  const buttonDeleteClickHandler = () => {
    dispatch(productDeleteAction(productId));
  };

  useEffect(() => {
    dispatch(fetchProductAction(productId));
    dispatch(fetchCategories());
  }, [productId, dispatch]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setImage(product.image);
    }
  }, [product]);

  return (
    <div className="edit">
      {isDeleted && <span>Товар Удален!</span>}
      {product && (
        <form className="edit-form" onSubmit={formSubmitHandler}>
          <div className="edit-form__left">
            <Image
              className="edit-form__image"
              src={blobImage ? blobImage : product.image}
              alt={product.title}
              width={500}
              height={500}
            />
          </div>
          <div className="edit-form__right">
            <div className="edit-form__fieldset">
              <label className="edit-form__label">
                <span>Заголовок:</span>
                <FormInput
                  value={title}
                  onChange={titleChangeHandler}
                  disabled={isLoading}
                />
              </label>
              <label className="edit-form__label">
                <span>Цена:</span>
                <FormInput
                  type="number"
                  value={price}
                  onChange={priceChangeHandler}
                  disabled={isLoading}
                />
              </label>
              <label className="edit-form__label">
                <span>Описание:</span>
                <FormTextarea
                  value={description}
                  onChange={descriptionChangeHandler}
                  disabled={isLoading}
                />
              </label>
              <label className="edit-form__label">
                Категория:
                <FormSelect
                  options={categories}
                  selected={category}
                  onChange={categoryChanheHandler}
                  disabled={isLoading}
                />
              </label>
              <label className="edit-form__label">
                <span>Фото товара:</span>
                <FormInputFile
                  accept=".jpg,.png"
                  onChange={imageChangeHandler}
                  disabled={isLoading}
                />
              </label>
            </div>
            <div className="edit-form__controls">
              <Button type="submit" disabled={isLoading}>
                {`${isSave ? "Сохранено" : "Сохранить изменения"}`}
              </Button>
              <Button
                type="button"
                onClick={buttonDeleteClickHandler}
                disabled={isLoading}
              >
                Удалить товар
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditForm;
