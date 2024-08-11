"use client";

import React, { useState } from "react";
import schemas from "../../schema/skill.json";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const provider = new ethers.BrowserProvider(window.ethereum);

const easContractAddress = "0x4200000000000000000000000000000000000021";
const schemaUID = "0x6d86bd0b1d6a64247af654f100037f745fda5fb7b2cec5b1d855170cfaeb64f7";
const eas = new EAS(easContractAddress);

const SkillRatingForm = () => {
  const { address: connectedAddress } = useAccount();

  const [formData, setFormData] = useState<{
    [key: string]: string | number | undefined;
  }>({
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    let encodedString = "";
    const eventDetailsSchema: { [key: string]: { type: string; value: string } } =
      schemas["0x6d86bd0b1d6a64247af654f100037f745fda5fb7b2cec5b1d855170cfaeb64f7"];
    console.log("Event Details Schema:", eventDetailsSchema);
    for (const key in eventDetailsSchema) {
      if (Object.hasOwnProperty.call(eventDetailsSchema, key)) {
        encodedString += `${eventDetailsSchema[key].type} ${key},`;
      }
    }

    encodedString = encodedString.slice(0, -1);
    const schemaEncoder = new SchemaEncoder(encodedString);
    const dataToEncode = Object.entries(eventDetailsSchema).map(([key, { type, value }]) => ({
      name: key,
      value: formData[value], // Getting the actual value from eventDetails
      type: type,
    }));

    console.log("Data to encode:", dataToEncode);

    const encodedData = schemaEncoder.encodeData(dataToEncode);
    const schemaUID = await grantAttestation(encodedData);
    console.log("Schema UID:", schemaUID);

    // Perform form submission logic here
  };

  async function grantAttestation(encodedData: any) {
    try {
      // Get the signer from the provider
      const signer = await provider.getSigner();
      // Connect the signer to the EAS contract
      await eas.connect(signer);
      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: formData.address as string,
          expirationTime: BigInt(0),
          revocable: true, // Be aware that if your schema is not revocable, this MUST be false
          data: encodedData,
        },
      });

      const result = await tx.wait();

      return result;
    } catch (error) {
      console.error("Error granting attestation:", error);
      throw error;
    }
  }

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
