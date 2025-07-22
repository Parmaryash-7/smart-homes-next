'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useDispatch } from 'react-redux'
import { usePathname } from 'next/navigation'
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";

const AOSInitializer = () => {
  //   const country = await getCountryList();
  //   const dispatch = useDispatch()
  const pathname = usePathname()

  useEffect(() => {
     const timer = setTimeout(() => {
      Fancybox.destroy();

      Fancybox.bind("[data-fancybox]", {
        plugins: {
          Toolbar: true,
        },
        Carousel: {
          infinite: false,
          Toolbar: {
            display: {
              left: ["counter"],
              middle: [],
              right: ["zoom", "close"],
            },
          },
        },
      });
    }, 0);

    AOS.init({
      duration: 1000,
      once: true,
    });

    return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    // Scroll to the very top (feel free to set behavior:"smooth")
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    // Tell AOS to recalc element positions
    // AOS.refreshHard();      // `refreshHard` is safest after layout changes
  }, [pathname])

  return null
}

export default AOSInitializer
