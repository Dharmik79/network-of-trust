"use client";

import React, { useState } from "react";

const SkillRatingForm = () => {
  const [formData, setFormData] = useState({
    address: "",
    skill: "",
    rating: 5,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSliderChange = (e: any) => {
    setFormData({
      ...formData,
      rating: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Perform form submission logic here
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 p-10 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Skill Rating Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block text-gray-700 text-lg font-semibold mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        {/* Skill Field */}
        <div>
          <label htmlFor="skill" className="block text-gray-700 text-lg font-semibold mb-2">
            Skill
          </label>
          <input
            type="text"
            id="skill"
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            placeholder="Enter your skill"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Rating Field with Slider */}
        <div>
          <label htmlFor="rating" className="block text-gray-700 text-lg font-semibold mb-2">
            Rating
          </label>
          <input
            type="range"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleSliderChange}
            min="1"
            max="10"
            className="w-full h-2 bg-black-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-center mt-2">
            <span className="text-gray-700 font-medium text-lg">Rating: {formData.rating}</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SkillRatingForm;
