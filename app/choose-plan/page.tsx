"use client";
import Footer from "../components/Footer";
import "./choose-plan.css";
import { CiFileOn } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { CiRoute } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";
import { CiCircleChevUp } from "react-icons/ci";
import { useState } from "react";
import { app } from "../firebase/init";
import { getCheckoutUrl } from "../stripe/stripePayment";
import { useRouter } from "next/navigation"

const salesPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("yearly");

  const toggleAccordion = (index: any) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const router = useRouter()

  const upgradeMonthly = async () => {
    const priceId = "price_1SmkJsKHJ3J2XprBdPv1egM2"
    const checkoutURL = await getCheckoutUrl(app, priceId, "subscription")
    router.push(checkoutURL)
  }
  const upgradeYearly = async () => {
    const priceId = "price_1SmkeeKHJ3J2XprBCmkxeV7B"
    const checkoutURL = await getCheckoutUrl(app, priceId, "payment")
    router.push(checkoutURL)
  }

  return (
    <>
      <div className="wrapper__full">
        <div className="plan">
          <div className="plan__header--wrapper">
            <div className="plan__header">
              <div className="plan__title">
                Get unlimited access to many amazing books to read
              </div>
              <div className="plan__sub-title">
                Turn ordinary moments into amazing learning opportunities
              </div>
              <figure className="plan__img--wrapper">
                <img className="plan__img" src="/pricing-top.png" alt="" />
              </figure>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="plan__features--wrapper">
                <div className="plan__features">
                  <figure className="plan__feature--icon">
                    <CiFileOn />
                  </figure>
                  <div className="plan__features--text">
                    <span className="bold">Key ideas in a few min</span> with
                    many books to read
                  </div>
                </div>

                <div className="plan__features">
                  <figure className="plan__feature--icon">
                    <CiShare2 />
                  </figure>
                  <div className="plan__features--text">
                    <span className="bold">3 million </span> people growing with
                    Summarist everyday
                  </div>
                </div>

                <div className="plan__features">
                  <figure className="plan__feature--icon">
                    <CiRoute />
                  </figure>
                  <div className="plan__features--text">
                    <span className="bold">Precise recommendations </span>{" "}
                    collections curated by experts
                  </div>
                </div>
              </div>
              <div className="section__title">
                Choose the plan that fits you
              </div>
              <div
                className={`plan__card ${
                  selectedPlan === "yearly" ? "plan__card--active" : ""
                }`}
                onClick={() => setSelectedPlan("yearly")}
              >
                <div className="plan__card--circle">
                  {selectedPlan === "yearly" && (
                    <div className="plan__card--dot"></div>
                  )}
                </div>
                <div className="plan__card--content">
                  <div className="plan__card--title">Premium Plus Yearly</div>
                  <div className="plan__card--price">$99.99/year</div>
                  <div className="plan__card--text">
                    7-day free trial included
                  </div>
                </div>
              </div>
              <div className="plan__card--separator">
                <div className="plan__separator">or</div>
              </div>
              <div
                className={`plan__card ${
                  selectedPlan === "monthly" ? "plan__card--active" : ""
                }`}
                onClick={() => setSelectedPlan("monthly")}
              >
                <div className="plan__card--circle">
                  {selectedPlan === "monthly" && (
                    <div className="plan__card--dot"></div>
                  )}
                </div>
                <div className="plan__card--content">
                  <div className="plan__card--title">Premium Monthly</div>
                  <div className="plan__card--price">$9.99/month</div>
                  <div className="plan__card--text">No trial included</div>
                </div>
              </div>
              {selectedPlan === "yearly"? 
              
              <div className="plan__card--cta">
                <div className="btn--wrapper">
                  <button onClick={upgradeYearly} className="btn">Start your free 7-day trial</button>
                </div>
                <div className="plan__disclaimer">
                  Cancel your trial at any time before it ends, and you won't be
                  charged.
                </div> 
                </div>
                 
                : 
                
                <div className="plan__card--cta">
                <div className="btn--wrapper">
                  <button onClick={upgradeMonthly} className="btn">Start your first month</button>
                </div>
                <div className="plan__disclaimer">
                  30-day money back guarantee, no questions asked.
                </div>
                </div> 
                 }
              
              
              <div className="faq__wrapper">
                <div className="accordion__card">
                  <div
                    className="accordion__header"
                    onClick={() => toggleAccordion(0)}
                  >
                    <div className="accordion__title">
                      How does the free 7-day trial work?
                    </div>
                    {openFaq === 0 ? (
                      <CiCircleChevUp className="menu__arrow" />
                    ) : (
                      <CiCircleChevDown className="menu__arrow" />
                    )}
                  </div>

                  {openFaq === 0 && (
                    <div className="accordion__body">
                      Begin your complimentary 7-day trial with a Summarist
                      annual membership. You are under no obligation to continue
                      your subscription, and you will only be billed when the
                      trial period expires. With Premium access, you can learn
                      at your own pace and as frequently as you desire, and you
                      may terminate your subscription prior to the conclusion of
                      the 7-day free trial.
                    </div>
                  )}
                </div>
                <div className="accordion__card">
                  <div
                    className="accordion__header"
                    onClick={() => toggleAccordion(1)}
                  >
                    <div className="accordion__title">
                      Can I switch subscriptions from monthly to yearly, or yearly to monthly?
                    </div>
                    {openFaq === 1 ? (
                      <CiCircleChevUp className="menu__arrow" />
                    ) : (
                      <CiCircleChevDown className="menu__arrow" />
                    )}
                  </div>
                  {openFaq === 1 && (
                    <div className="accordion__body">
                      While an annual plan is active, it is not feasible to
                      switch to a monthly plan. However, once the current month
                      ends, transitioning from a monthly plan to an annual plan
                      is an option.
                    </div>
                  )}
                </div>
                <div className="accordion__card">
                  <div
                    className="accordion__header"
                    onClick={() => toggleAccordion(2)}
                  >
                    <div className="accordion__title">
                      What's included in the Premium plan?
                    </div>
                    {openFaq === 2 ? (
                      <CiCircleChevUp className="menu__arrow" />
                    ) : (
                      <CiCircleChevDown className="menu__arrow" />
                    )}
                  </div>
                  {openFaq === 2 && (
                    <div className="accordion__body">
                      Premium membership provides you with the ultimate
                      Summarist experience, including unrestricted entry to many
                      best-selling books high-quality audio, the ability to
                      download titles for offline reading, and the option to
                      send your reads to your Kindle.
                    </div>
                  )}
                </div>
                <div className="accordion__card">
                  <div
                    className="accordion__header"
                    onClick={() => toggleAccordion(3)}
                  >
                    <div className="accordion__title">
                      Can I cancel during my trial or subscription?
                    </div>
                    {openFaq === 3 ? (
                      <CiCircleChevUp className="menu__arrow" />
                    ) : (
                      <CiCircleChevDown className="menu__arrow" />
                    )}
                  </div>
                  {openFaq === 3 && (
                    <div className="accordion__body">
                      You will not be charged if you cancel your trial before
                      its conclusion. While you will not have complete access to
                      the entire Summarist library, you can still expand your
                      knowledge with one curated book per day.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default salesPage;
