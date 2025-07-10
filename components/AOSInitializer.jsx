"use client"

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch } from 'react-redux';

const AOSInitializer = () => {
//   const country = await getCountryList();
//   const dispatch = useDispatch();

  useEffect(()=>{

  }, [])

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
        return () => {
            AOS.refresh();
        };
    }, []);

    return null;
};

export default AOSInitializer;
