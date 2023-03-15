import React from "react";
import { useState } from "react";

const Create = () => {
  return (
    <div className="bg-secondary text-first flex justify-center sm:py-32 py-6">
      <div className="lg:max-w-[1280px] bg-primary sm:py-16 py-6 sm:px-16 px-6 rounded-xl">

        <form className="flex flex-col gap-10">

          <h2 className="font-semibold sm:text-[60px] text-[40px]">
            Create Recipes
          </h2>

          <div className="flex flex-col">
          <label htmlFor="">Name :</label>
          <input type="text" name="" className="bg-secondary rounded-lg py-4 px-4 outline-none border-none mt-4"/>
          </div>

          <div className="flex flex-col">
          <label htmlFor="">Ingredients :</label>
          <input type="text" name="" className="bg-secondary rounded-lg py-4 px-4 outline-none border-none mt-4"/>
          </div>

          <div className="flex flex-col">
          <label htmlFor="">Instructions :</label>
          <textarea type="text" name="" rows={5} className="bg-secondary rounded-lg py-4 px-4 outline-none border-none mt-4"/>
          </div>

          <div className="flex flex-col">
          <label htmlFor="">Image URL :</label>
          <input type="text" name="" className="bg-secondary rounded-lg py-4 px-4 outline-none border-none mt-4"/>
          </div>

          <div className="flex flex-col">
          <label htmlFor="">Cooking Times (minutes) :</label>
          <input type="text" name="" className="bg-secondary rounded-lg py-4 px-4 outline-none border-none mt-4"/>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Create;
