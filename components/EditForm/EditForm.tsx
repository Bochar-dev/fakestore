"use client";

import "./style.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import Image from "next/image";
import { productSelector } from "@/store/slices/product/selectors";
import { categoriesSelector } from "@/store/slices/categories/selectors";
import { unSave } from "@/store/slices/product/reducer";
import { fetchCategories } from "@/store/slices/categories/api-actions";
import { Product } from "@/types/product";
import { useForm } from "react-hook-form";

import {
  fetchProductAction,
  productDeleteAction,
  productEditAction,
} from "@/store/slices/product/api-actions";

type EditFormProps = {
  productId: string;
};

type EditFormValues = Omit<Product, "id">;

const EditForm = ({ productId }: EditFormProps) => {
  const dispatch = useAppDispatch();

  const { product, isLoading, isSave, isDeleted } =
    useAppSelector(productSelector);
  const { categories } = useAppSelector(categoriesSelector);

  const [blobImage, setBlobImage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<EditFormValues>();

  const watchFile = watch("image");
  const watchTitle = watch("title");
  const watchPrice = watch("price");
  const watchDescription = watch("description");
  const watchCaterory = watch("category");

  const formSubmitHandler = handleSubmit((data) => {
    const fileName = Object(data.image[0]).name;

    const updateProduct = {
      ...data,
      image: fileName ? fileName : product?.image,
    };

    dispatch(
      productEditAction({
        id: productId,
        updateProduct: updateProduct,
      })
    );
  });

  const buttonDeleteClickHandler = () => {
    dispatch(productDeleteAction(productId));
  };

  useEffect(() => {
    dispatch(fetchProductAction(productId));
    dispatch(fetchCategories());
  }, [productId, dispatch]);

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("category", product.category);
    }
  }, [product, setValue]);

  useEffect(() => {
    if (watchFile && watchFile.length) {
      const file = Object(watchFile[0]);

      const blob = URL.createObjectURL(file);

      setBlobImage(blob);

      dispatch(unSave());
    }
  }, [watchFile, dispatch]);

  useEffect(() => {
    dispatch(unSave());
  }, [watchTitle, watchCaterory, watchDescription, watchPrice, dispatch]);

  return (
    <div className="edit">
      {isDeleted && <span>Товар Удален!</span>}
      {product && (
        <form className="edit-form" onSubmit={formSubmitHandler}>
          <div className="edit-form__left">
            <div></div>
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
                <div className="form-element">
                  {errors.title && (
                    <span className="form-element__error">
                      {errors.title.message}
                    </span>
                  )}
                  <input
                    className="form-element__field"
                    type="text"
                    {...register("title", {
                      required: "Это обязательное поле",
                    })}
                    disabled={isLoading}
                  />
                </div>
              </label>
              <label className="edit-form__label">
                <span>Цена:</span>
                <div className="form-element">
                  {errors.price && (
                    <span className="form-element__error">
                      {errors.price.message}
                    </span>
                  )}
                  <input
                    className="form-element__field"
                    type="text"
                    {...register("price", {
                      required: "Это обязательное поле",
                    })}
                    disabled={isLoading}
                  />
                </div>
              </label>
              <label className="edit-form__label">
                <span>Описание:</span>
                <div className="form-element">
                  {errors.description && (
                    <span className="form-element__error">
                      {errors.description.message}
                    </span>
                  )}
                  <textarea
                    className="form-element__field form-element__field--textarea"
                    {...register("description", {
                      required: "Это обязательное поле",
                    })}
                    disabled={isLoading}
                  />
                </div>
              </label>
              <label className="edit-form__label">
                <span>Категория:</span>
                <div className="form-element">
                  <select
                    className="form-element__field"
                    {...register("category")}
                    disabled={isLoading}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
              <label className="edit-form__label">
                <span>Фото товара:</span>
                <div className="form-element">
                  {errors.image && (
                    <span className="form-element__error">
                      {errors.image.message}
                    </span>
                  )}
                  <input
                    className="form-element__field form-element__field--file"
                    type="file"
                    {...register("image")}
                    disabled={isLoading}
                  />
                </div>
              </label>
            </div>
            <div className="edit-form__controls">
              <button className="button">
                {isLoading && "Сохроняем..."}
                {!isLoading && isSave ? "Сохранено" : "Сохранить изменения"}
              </button>
              <button
                className="button"
                type="button"
                onClick={buttonDeleteClickHandler}
              >
                Удалить товар
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditForm;
