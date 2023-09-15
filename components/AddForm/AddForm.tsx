"use client";

import "./style.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import stabImage from "@/public/static-images/stub.png";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fetchCategories } from "@/store/slices/categories/api-actions";
import { categoriesSelector } from "@/store/slices/categories/selectors";
import { productAddAction } from "@/store/slices/product/api-actions";
import { productSelector } from "@/store/slices/product/selectors";
import { unSucces } from "@/store/slices/product/reducer";
import { useForm } from "react-hook-form";
import { Product } from "@/types/product";

type AddFormValues = Omit<Product, "id">;

const AddForm = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { categories } = useAppSelector(categoriesSelector);
  const { isSucces, isLoading } = useAppSelector(productSelector);

  const [blobImage, setBlobImage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AddFormValues>();

  const watchFile = watch("image");

  const formSubmitHandler = handleSubmit((data) => {
    const fileName = Object(data.image[0]).name;
    const newProduct = { ...data, image: fileName };

    dispatch(productAddAction({ ...newProduct }));
  });

  useEffect(() => {
    if (watchFile && watchFile.length) {
      const file = Object(watchFile[0]);

      const blob = URL.createObjectURL(file);

      setBlobImage(blob);
    }
  }, [watchFile]);

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
            <div className="input">
              {errors.title && (
                <span className="input__error">{errors.title.message}</span>
              )}
              <input
                className="input__field"
                type="text"
                {...register("title", { required: "Это обязательное поле" })}
                disabled={isLoading}
              />
            </div>
          </label>
          <label className="add__form-label">
            <span>Цена: </span>
            <div className="input">
              {errors.price && (
                <span className="input__error">{errors.price.message}</span>
              )}
              <input
                className="input__field"
                type="text"
                {...register("price", { required: "Это обязательное поле" })}
                disabled={isLoading}
              />
            </div>
          </label>
          <label className="add__form-label">
            <span>Описание: </span>
            <div className="textarea">
              {errors.description && (
                <span className="textarea__error">
                  {errors.description.message}
                </span>
              )}
              <textarea
                className="textarea__field"
                {...register("description", {
                  required: "Это обязательное поле",
                })}
                disabled={isLoading}
              />
            </div>
          </label>
          <label className="add__form-label">
            <span>Категория: </span>
            <div className="select">
              <select
                className="select__field"
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
          <label className="add__form-label">
            <span>Фото: </span>
            <div className="file">
              {errors.image && (
                <span className="file__error">{errors.image.message}</span>
              )}
              <input
                className="file__field"
                type="file"
                {...register("image", { required: "Это обязательное поле" })}
                disabled={isLoading}
              />
            </div>
          </label>
        </div>
        <button className="button">
          {isLoading ? "Добавляем..." : "добавить"}
        </button>
      </form>
    </div>
  );
};

export default AddForm;
