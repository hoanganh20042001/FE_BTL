import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Image, Button, Transition } from "@mantine/core";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "../../css/slider.css";

export default function Slider({ type, items }) {
    let responsive;
    const [hover, setHover] = React.useState(false);
    // React.useEffect(() => {
    //     console.log(items);
    // });
    if (type === "homeads") {
        responsive = {
            superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 1,
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 1,
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 1,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
            },
        };
    } else {
        responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 5,
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 4,
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
            },
        };
    }

    const CustomDot = ({ onMove, index, onClick, active }) => {
        // onMove means if dragging or swiping in progress.
        // active is provided by this lib for checking if the item is active or not.
        return (
            <li
                className={active ? "active" : "inactive"}
                onClick={() => onClick()}
            >
                <div></div>
            </li>
        );
    };

    const CustomRightArrow = ({ onClick, ...rest }) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType },
        } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <Transition
                mounted={hover}
                transition="scale"
                duration={10000}
                timingFunction="ease-in-out"
            >
                {() => (
                    <Button
                        className="custom-right-arrow"
                        onClick={() => onClick()}
                        variant="subtle"
                    >
                        <FaChevronRight size={30} />
                    </Button>
                )}
            </Transition>
        );
    };

    const CustomLeftArrow = ({ onClick, ...rest }) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType },
        } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <Button
                className="custom-left-arrow"
                onClick={() => onClick()}
                variant="subtle"
            >
                <FaChevronLeft size={30} />
            </Button>
        );
    };

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="carousel-control"
        >
            <Carousel
                responsive={responsive}
                additionalTransfrom={0}
                arrows={hover}
                autoPlaySpeed={3000}
                autoPlay
                centerMode={false}
                className="home-ads-slider"
                dotListClass=""
                focusOnSelect={false}
                infinite
                itemClass={type === "homeads" ? "home-ads-slider-item" : ""}
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                showDots={type === "product" || type == "image" ? false : true}
                sliderClass=""
                slidesToSlide={1}
                swipeable={true}
                customDot={<CustomDot />}
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
                customTransition="transform 0.5s ease-in-out"
            >
                {items.map((item) => {
                    return type === "image" ? (
                        <Image
                            src={item}
                            key={item}
                            alt="img"
                            fit="contain"
                            height={80}
                            style={{
                                border: "1px solid black",
                                margin: 5,
                                cursor: "pointer",
                            }}
                        ></Image>
                    ) : (
                        item
                    );
                })}
            </Carousel>
        </div>
    );
}
