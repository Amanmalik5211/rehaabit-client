import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import EnquireNowModal from "./EnquireNowModal";
import ServiceDetailsModal from "../ServiceDetailsModal";

const PopularSearches = () => {
  const { allServices } = useSelector((state) => state.service);

  const [isEnquireNowModalOpen, setIsEnquireNowModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceNameToPass, setServiceNameToPass] = useState(null);

  const nonPricedServices = allServices.filter(
    (service) =>
      service.priceStatus === "non-priced" && service.status !== "Draft"
  );

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -355 : 355,
        behavior: "smooth",
      });
    }
  };

  const handleServiceModalOpen = (serviceName) => {
    setServiceNameToPass(serviceName);
    setIsServiceModalOpen(true);
  };

  const handleServiceModalClose = () => setIsServiceModalOpen(false);
  const handleEnquireNowModalOpen = (serviceName) => {
    setServiceNameToPass(serviceName);
    setIsEnquireNowModalOpen(true);
  };

  const handleEnquireNowModalClose = () => setIsEnquireNowModalOpen(false);

  return (
    <>
      <EnquireNowModal
        isEnquireNowModalOpen={isEnquireNowModalOpen}
        handleEnquireNowModal={handleEnquireNowModalClose}
        serviceNameToPass={serviceNameToPass}
      />
      <ServiceDetailsModal
        isServiceModalOpen={isServiceModalOpen}
        handleServiceModal={handleServiceModalClose}
        serviceName={serviceNameToPass}
      />

      <section className="relative flex flex-col px-10 mt-40 w-full max-md:mt-10 max-md:max-w-full max-md:px-0 max-md:pl-4">
        <h2 className="text-4xl font-semibold text-center text-violet-700 max-md:max-w-full">
          For Contract Enquiry{" "}
        </h2>

        <div className="flex items-center justify-between mt-12 max-md:mt-10 w-full relative">
          <button
            className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md"
            onClick={() => scroll("left")}
          >
            <FaArrowLeft size={24} />
          </button>

          <div
            ref={scrollRef}
            className="scrollable-container flex gap-4 justify-start self-center w-full overflow-x-auto overflow-y-hidden px-4 
              scrollbar-hide -webkit-overflow-scrolling: touch"
          >
            {nonPricedServices.map((service, index) => {
              const { _id, thumbnail, serviceName } = service;

              return (
                <div
                  key={_id}
                  className={`min-w-[300px] max-w-[300px] sm:min-w-[340px] md:min-w-[355px] md:max-w-[355px] 
                    flex-shrink-0 snap-center ${index === 0 ? "ml-4" : ""} ${
                    index === nonPricedServices.length - 1 ? "mr-4" : ""
                  }`}
                >
                  <img
                    src={thumbnail}
                    alt={serviceName}
                    className="w-full h-56 max-w-full rounded-tl-xl rounded-tr-xl object-cover"
                  />

                  <div className="bg-blue-500 px-6 py-4 rounded-bl-xl rounded-br-xl">
                    <h3 className="text-white font-semibold text-2xl mb-4">
                      {serviceName}
                    </h3>

                    {/* Flex container for buttons */}
                    <div className="flex justify-between items-center">
                      <button
                        className="text-green-600 bg-white px-4 py-2 rounded-full transition-all duration-300 hover:bg-green-600 hover:text-white shadow-lg border border-green-600"
                        onClick={() => handleServiceModalOpen(_id)}
                      >
                        More Details
                      </button>
                      <button
                        className="text-purple-600 bg-white px-4 py-2 rounded-full transition-all duration-300 hover:bg-purple-600 hover:text-white shadow-lg border border-purple-600"
                        onClick={() => handleEnquireNowModalOpen(serviceName)}
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md"
            onClick={() => scroll("right")}
          >
            <FaArrowRight size={24} />
          </button>
        </div>
      </section>
    </>
  );
};

export default PopularSearches;
