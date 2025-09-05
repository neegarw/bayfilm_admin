import { useEffect, useRef, useState } from 'react';
import { getProducts } from '../../api/api';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import Logo from "../../assets/img/logo.svg";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button, Description, Field, Fieldset, Input, Label, Legend, Select, Textarea } from '@headlessui/react';
import clsx from 'clsx'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import g4 from "../../assets/img/sliderimg2.jpg";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import configObj from "../../config/config";
import { Cookies } from "react-cookie";
import toast from 'react-hot-toast';

const token = new Cookies().get(configObj.token);
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function AddProduct() {
    const [loading,setLoading]=useState(true)
    const [landing,setLanding]=useState(null)
    const [duzelisText,setDuzelisText]=useState('')
    const [duzelisGrid,seDuzelisGrid]=useState(null)
    const fileInputRef = useRef(null);
    

    useEffect(() => {
        fetch('https://bayfilm.xezernn.com.az/landing')
        .then(res=>res.json())
        .then(arr=>setLanding(
                {
                    headerImageInp:{
                        header_img:arr[0].header_img,
                        disabled:true,
                    },
                    titleName:{
                        title:arr[0].title,
                        disabled:true
                    },
                    labelName:{
                        label:arr[0].label,
                        disabled:true
                    },
                    descriptionText:{
                        description:arr[0].description,
                        disabled:true
                    },
                    aboutImage:{
                        about_image:arr[0].about_image,
                        disabled:true
                    },
                    locationInfo:{
                        location:arr[0].location,
                        disabled:true
                    },
                    mailInfo:{
                        mail:arr[0].mail,
                        disabled:true
                    },
                    numberInfo:{
                        number:arr[0].number,
                        disabled:true
                    },
                    insta:{
                        instagram:arr[0].instagram,
                        disabled:true
                    },
                    tiktokInfo:{
                        tiktok:arr[0].tiktok,
                        disabled:true
                    },
                    paymentInfo:{
                        payment:arr[0].payment,
                        disabled:true
                    },
                    gridImages:[
                        {
                            id:0,
                            gridItem:arr[0].grid_images[0],
                            disabled:true
                        },
                        {
                            id:1,
                            gridItem:arr[0].grid_images[1],
                            disabled:true
                        },
                        {
                            id:2,
                            gridItem:arr[0].grid_images[2],
                            disabled:true
                        },
                        {
                            id:3,
                            gridItem:arr[0].grid_images[3],
                            disabled:true
                        }
                    ]
                }
            )
        )
    }, []);


   function handleSaveChanges(){
        const postObj={
            header_img:landing?.headerImageInp?.header_img,
            grid_images:landing?.gridImages?.map(item=>item?.gridItem),
            title:landing?.titleName?.title,
            label:landing?.labelName?.label,
            description:landing?.descriptionText?.description,
            about_image:landing?.aboutImage?.about_image,
            location:landing?.locationInfo?.location,
            mail:landing?.mailInfo?.mail,
            number:landing?.numberInfo?.number,
            instagram:landing?.insta?.instagram,
            tiktok:landing?.tiktokInfo.tiktok,
            payment:landing?.paymentInfo?.payment
        }
        fetch('https://bayfilm.xezernn.com.az/landing',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token ? `Bearer ${token}` : undefined
            },
            body:JSON.stringify(postObj)
        }).then(res=>res.json())
        .then(res=>console.log(res))
   }

    function fetchNewHeaderImg(inpVal){
        const formData=new FormData()
        formData.append('img', inpVal);
        fetch('https://bayfilm.xezernn.com.az/img',{
            method: "POST",
            headers: {
                "Authorization": token ? `Bearer ${token}` : undefined
            },
            body:formData
        }).then(res=>res.json())
        .then(obj=>setLanding(prev=>(
            {
                ...prev, 
                headerImageInp: 
                { 
                    ...prev.headerImageInp, 
                    header_img:obj.file.path ? obj.file.path : prev.headerImageInp?.header_img
                }
            }
        )))
    }
    function fetchNewAboutImg(inpVal){
        const formData=new FormData()
        formData.append('img', inpVal);
        fetch('https://bayfilm.xezernn.com.az/img',{
            method: "POST",
            headers: {
                "Authorization": token ? `Bearer ${token}` : undefined
            },
            body:formData
        }).then(res=>res.json())
        .then(obj=>setLanding(prev=>(
            {
                ...prev, 
                aboutImage: 
                { 
                    ...prev.aboutImage, 
                    about_image:obj.file.path ? obj.file.path : prev.aboutImage?.about_image
                }
            }
        )))
    }
    
    function gridFileUpdate(i){
        fileInputRef.current.click()
        seDuzelisGrid(i)
    }

    return (
        <main>
            <h1 className='text-center text-[20px] font-[500] my-[20px]'>Landingin idarə olunması formu:</h1>
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e)=>{
                    const file = e.target.files[0];
                    if (file) {
                        const formData=new FormData()
                        formData.append('img', file);
                        fetch('https://bayfilm.xezernn.com.az/img',{
                            method: "POST",
                            headers: {
                                "Authorization": token ? `Bearer ${token}` : undefined
                            },
                            body:formData
                        }).then(res=>res.json())
                        .then(obj=>setLanding(prev=>{
                            const newGridImages = prev.gridImages.map((image,i) => {
                                if (image.id ===duzelisGrid ) {
                                    return { ...image,gridItem:obj.file.path ? obj.file.path : prev.gridImages?.[i].gridItem};
                                }
                                return image;
                            });

                            return {
                                ...prev, 
                                gridImages: newGridImages 
                            };
                        }))
                    }
                }}
                className="hidden" 
            />
            <section className="bg-[#354251] relative overflow-x-auto shadow-md sm:rounded-lg">
                {/* <form onSubmit={handleSaveChanges}> */}
                    <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
                        <Legend className="text-base/7 font-semibold text-white">Landing details</Legend>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white flex items-center gap-2">
                                <span>Header's image</span>
                                {
                                    landing?.headerImageInp?.disabled ?
                                    <BiEdit 
                                    onClick={()=>{
                                        if(Object.values(landing).filter(item=>!Array.isArray(item)).find(item=>!item.disabled)) return toast.error('Tamamlanmayan editin qalib!')
                                        else setLanding(prev=>(
                                            {
                                                ...prev, 
                                                headerImageInp: 
                                                { 
                                                    ...prev.headerImageInp, 
                                                    disabled: false 
                                                }
                                            }
                                        ))
                                    }} 
                                    size={22} className='cursor-pointer'/> :
                                    <MdPlaylistAddCheckCircle 
                                    onClick={()=>setLanding(prev=>(
                                        {
                                            ...prev, 
                                            headerImageInp: 
                                            { 
                                                ...prev.headerImageInp,
                                                disabled: true 
                                            }
                                        }
                                    ))} 
                                    size={22} className='cursor-pointer' />
                                }
                            </Label>
                            <Input
                            type={landing?.headerImageInp?.disabled ? 'text':'file'}
                            disabled={landing?.headerImageInp?.disabled}
                            name='headerImage'
                            onChange={(e)=>fetchNewHeaderImg(e.target.files[0])}
                            value={landing?.headerImageInp?.disabled ? ('https://'+VITE_BASE_URL+landing?.headerImageInp?.header_img) : undefined}
                                className={clsx(
                                'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                                )}
                            />
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white">Grid images</Label>
                            <Description className="text-sm/6 text-white/50">Total number of grid images should be 4.</Description>
                            <div className="mt-[12px] grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 md:grid-rows-2 min-[400px]:grid-rows-2 grid-rows-4 gap-4 min-[400px]:px-[50px] md:px-[100px]">
                                <div className="group relative w-full md:h-full h-[250px] md:row-span-2 rounded-[20px] overflow-hidden">
                                    <img src={'https://'+VITE_BASE_URL+landing?.gridImages?.[0]?.gridItem} alt="Gallery 1" className="group-hover:opacity-[.5] transition-all duration-75 ease-in-out w-full h-full object-cover" />
                                    <div 
                                    className='cursor-pointer z-100 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]'
                                    >
                                        <BiEdit onClick={()=>gridFileUpdate(0)} fontSize={30} className='text-white'/>
                                        
                                    </div>
                                </div>
                                <div className="group relative w-full h-[250px] rounded-[20px] overflow-hidden">
                                    <img src={'https://'+VITE_BASE_URL+landing?.gridImages?.[1]?.gridItem} alt="Gallery 2" className="group-hover:opacity-[.5] transition-all duration-75 ease-in-out w-full h-full object-cover" />
                                    <div 
                                    className='cursor-pointer z-100 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]'
                                    >
                                        <BiEdit onClick={()=>gridFileUpdate(1)} fontSize={30} className='text-white'/>
                                        
                                    </div>
                                </div>
                                <div className="group relative w-full md:h-full h-[250px] md:row-span-2 rounded-[20px] overflow-hidden">
                                    <img src={'https://'+VITE_BASE_URL+landing?.gridImages?.[2]?.gridItem} alt="Gallery 4" className="group-hover:opacity-[.5] transition-all duration-75 ease-in-out w-full h-full object-cover" />
                                    <div 
                                    className='cursor-pointer z-100 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]'
                                    >
                                        <BiEdit onClick={()=>gridFileUpdate(2)} fontSize={30} className='text-white'/>
                                        
                                    </div>
                                </div>
                                <div className="group relative w-full h-[250px] md:row-span-1 rounded-[20px] overflow-hidden">
                                    <img src={'https://'+VITE_BASE_URL+landing?.gridImages?.[3]?.gridItem} alt="Gallery 3" className="group-hover:opacity-[.5] transition-all duration-75 ease-in-out w-full h-full object-cover" />
                                    <div 
                                    className='cursor-pointer z-100 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]'
                                    >
                                        <BiEdit onClick={()=>gridFileUpdate(3)} fontSize={30} className='text-white'/>
                                        
                                    </div>
                                </div>
                            </div>
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white flex items-center gap-2">
                                <span>Title</span>
                                {
                                    landing?.titleName?.disabled ?
                                    <BiEdit 
                                    onClick={()=>{
                                        if(Object.values(landing).filter(item=>!Array.isArray(item)).find(item=>!item.disabled)) return toast.error('Tamamlanmayan editin qalib!')
                                        else setLanding(prev=>(
                                                {
                                                    ...prev, 
                                                    titleName: 
                                                    { 
                                                        ...prev.titleName, 
                                                        disabled: false 
                                                    }
                                                }
                                             ))
                                    }} 
                                    size={22} className='cursor-pointer'/> :
                                    <MdPlaylistAddCheckCircle 
                                    onClick={()=>{setLanding(prev=>(
                                        {
                                            ...prev, 
                                            titleName: 
                                            { 
                                                title:duzelisText ? duzelisText : prev?.titleName?.title,
                                                disabled: true 
                                            }
                                        }
                                    ));setDuzelisText('')}} 
                                    size={22} className='cursor-pointer' />
                                }
                            </Label>
                            <Input
                            type='text'
                            disabled={landing?.titleName?.disabled}
                            name='titleName'
                            onChange={(e)=>setDuzelisText(e.target.value)}
                            value={landing?.titleName?.disabled ? landing?.titleName?.title : duzelisText}
                            className={clsx(
                            'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                            )}
                            />
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white flex items-center gap-2">
                                <span>Lable</span>
                                {
                                    landing?.labelName?.disabled ?
                                    <BiEdit 
                                    onClick={()=>{
                                        if(Object.values(landing).filter(item=>!Array.isArray(item)).find(item=>!item.disabled)) return toast.error('Tamamlanmayan editin qalib!')
                                        else setLanding(prev=>(
                                                {
                                                    ...prev, 
                                                    labelName: 
                                                    { 
                                                        ...prev.labelName, 
                                                        disabled: false 
                                                    }
                                                }
                                             ))
                                    }} 
                                    size={22} className='cursor-pointer'/> :
                                    <MdPlaylistAddCheckCircle 
                                    onClick={()=>{setLanding(prev=>(
                                        {
                                            ...prev, 
                                            labelName: 
                                            { 
                                                label:duzelisText ? duzelisText : prev?.labelName?.label,
                                                disabled: true 
                                            }
                                        }
                                    ));setDuzelisText('');
                                    }} 
                                    size={22} className='cursor-pointer' />
                                }
                            </Label>
                            <Input
                            type='text'
                            disabled={landing?.labelName?.disabled}
                            name='labelName'
                            onChange={(e)=>setDuzelisText(e.target.value)}
                            value={landing?.labelName?.disabled ? landing?.labelName?.label : duzelisText}
                                className={clsx(
                                'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                                )}
                            />
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white flex items-center gap-2">
                                <span>Description</span>
                                {
                                    landing?.descriptionText?.disabled ?
                                    <BiEdit 
                                    onClick={()=>{
                                        if(Object.values(landing).filter(item=>!Array.isArray(item)).find(item=>!item.disabled)) return toast.error('Tamamlanmayan editin qalib!')
                                        else setLanding(prev=>(
                                                {
                                                    ...prev, 
                                                    descriptionText: 
                                                    { 
                                                        ...prev.descriptionText, 
                                                        disabled: false 
                                                    }
                                                }
                                             ))
                                    }} 
                                    size={22} className='cursor-pointer'/> :
                                    <MdPlaylistAddCheckCircle 
                                    onClick={()=>{setLanding(prev=>(
                                        {
                                            ...prev, 
                                            descriptionText: 
                                            { 
                                                description:duzelisText ? duzelisText : prev?.descriptionText?.description,
                                                disabled: true 
                                            }
                                        }
                                    ));setDuzelisText('')}} 
                                    size={22} className='cursor-pointer' />
                                }
                            </Label>
                            <Textarea
                                disabled={landing?.descriptionText?.disabled}
                                name='descriptionText'
                                onChange={(e)=>setDuzelisText(e.target.value)}
                                value={landing?.descriptionText?.disabled ? landing?.descriptionText?.description : duzelisText}
                                className={clsx(
                                'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                )}
                                rows={3}
                            />
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white flex items-center gap-2">
                                <span>About's image</span>
                                {
                                    landing?.aboutImage?.disabled ?
                                    <BiEdit 
                                    onClick={()=>{
                                        if(Object.values(landing).filter(item=>!Array.isArray(item)).find(item=>!item.disabled)) return toast.error('Tamamlanmayan editin qalib!')
                                        else setLanding(prev=>(
                                            {
                                                ...prev, 
                                                aboutImage: 
                                                { 
                                                    ...prev.aboutImage, 
                                                    disabled: false 
                                                }
                                            }
                                        ))
                                    }} 
                                    size={22} className='cursor-pointer'/> :
                                    <MdPlaylistAddCheckCircle 
                                    onClick={()=>setLanding(prev=>(
                                        {
                                            ...prev, 
                                            aboutImage: 
                                            { 
                                                ...prev.aboutImage,
                                                disabled: true 
                                            }
                                        }
                                    ))} 
                                    size={22} className='cursor-pointer' />
                                }
                            </Label>
                            <Input
                            type={landing?.aboutImage?.disabled ? 'text':'file'}
                            disabled={landing?.aboutImage?.disabled}
                            name='aboutImage'
                            onChange={(e)=>fetchNewAboutImg(e.target.files[0])}
                            value={landing?.aboutImage?.disabled ? ('https://'+VITE_BASE_URL+landing?.aboutImage?.about_image) : undefined}
                                className={clsx(
                                'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                                )}
                            />
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white flex items-center gap-2">
                                <span>Location</span>
                                {
                                    landing?.locationInfo?.disabled ?
                                    <BiEdit 
                                    onClick={()=>{
                                        if(Object.values(landing).filter(item=>!Array.isArray(item)).find(item=>!item.disabled)) return toast.error('Tamamlanmayan editin qalib!')
                                        else setLanding(prev=>(
                                                {
                                                    ...prev, 
                                                    locationInfo: 
                                                    { 
                                                        ...prev.locationInfo, 
                                                        disabled: false 
                                                    }
                                                }
                                             ))
                                    }} 
                                    size={22} className='cursor-pointer'/> :
                                    <MdPlaylistAddCheckCircle 
                                    onClick={()=>{setLanding(prev=>(
                                        {
                                            ...prev, 
                                            locationInfo: 
                                            { 
                                                location:duzelisText ? duzelisText : prev?.locationInfo?.location,
                                                disabled: true 
                                            }
                                        }
                                    ));setDuzelisText('')}} 
                                    size={22} className='cursor-pointer' />
                                }
                            </Label>
                            <Input
                            type='text'
                            disabled={landing?.locationInfo?.disabled}
                            name='locationInfo'
                            onChange={(e)=>setDuzelisText(e.target.value)}
                            value={landing?.locationInfo?.disabled ? landing?.locationInfo?.location : duzelisText}
                            className={clsx(
                            'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                            )}
                            />
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white flex items-center gap-2">
                                <span>Mail</span>
                                {
                                    landing?.mailInfo?.disabled ?
                                    <BiEdit 
                                    onClick={()=>{
                                        if(Object.values(landing).filter(item=>!Array.isArray(item)).find(item=>!item.disabled)) return toast.error('Tamamlanmayan editin qalib!')
                                        else setLanding(prev=>(
                                                {
                                                    ...prev, 
                                                    mailInfo: 
                                                    { 
                                                        ...prev.mailInfo, 
                                                        disabled: false 
                                                    }
                                                }
                                             ))
                                    }} 
                                    size={22} className='cursor-pointer'/> :
                                    <MdPlaylistAddCheckCircle 
                                    onClick={()=>{setLanding(prev=>(
                                        {
                                            ...prev, 
                                            mailInfo: 
                                            { 
                                                mail:duzelisText ? duzelisText : prev?.mailInfo?.mail,
                                                disabled: true 
                                            }
                                        }
                                    ));setDuzelisText('')}} 
                                    size={22} className='cursor-pointer' />
                                }
                            </Label>
                            <Input
                            type='text'
                            disabled={landing?.mailInfo?.disabled}
                            name='mailInfo'
                            onChange={(e)=>setDuzelisText(e.target.value)}
                            value={landing?.mailInfo?.disabled ? landing?.mailInfo?.mail : duzelisText}
                            className={clsx(
                            'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                            )}
                            />
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white flex items-center gap-2">
                                <span>Number</span>
                                {
                                    landing?.numberInfo?.disabled ?
                                    <BiEdit 
                                    onClick={()=>{
                                        if(Object.values(landing).filter(item=>!Array.isArray(item)).find(item=>!item.disabled)) return toast.error('Tamamlanmayan editin qalib!')
                                        else setLanding(prev=>(
                                                {
                                                    ...prev, 
                                                    numberInfo: 
                                                    { 
                                                        ...prev.numberInfo, 
                                                        disabled: false 
                                                    }
                                                }
                                             ))
                                    }} 
                                    size={22} className='cursor-pointer'/> :
                                    <MdPlaylistAddCheckCircle 
                                    onClick={()=>{setLanding(prev=>(
                                        {
                                            ...prev, 
                                            numberInfo: 
                                            { 
                                                number:duzelisText ? duzelisText : prev?.numberInfo?.number,
                                                disabled: true 
                                            }
                                        }
                                    ));setDuzelisText('')}} 
                                    size={22} className='cursor-pointer' />
                                }
                            </Label>
                            <Input
                            type='text'
                            disabled={landing?.numberInfo.disabled}
                            name='numberInfo'
                            onChange={(e)=>setDuzelisText(e.target.value)}
                            value={landing?.numberInfo?.disabled ? landing?.numberInfo?.number : duzelisText}
                            className={clsx(
                            'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                            )}
                            />
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white flex items-center gap-2">
                                <span>Instagram</span>
                                {
                                    landing?.insta?.disabled ?
                                    <BiEdit 
                                    onClick={()=>{
                                        if(Object.values(landing).filter(item=>!Array.isArray(item)).find(item=>!item.disabled)) return toast.error('Tamamlanmayan editin qalib!')
                                        else setLanding(prev=>(
                                                {
                                                    ...prev, 
                                                    insta: 
                                                    { 
                                                        ...prev.insta, 
                                                        disabled: false 
                                                    }
                                                }
                                             ))
                                    }} 
                                    size={22} className='cursor-pointer'/> :
                                    <MdPlaylistAddCheckCircle 
                                    onClick={()=>{setLanding(prev=>(
                                        {
                                            ...prev, 
                                            insta: 
                                            { 
                                                instagram:duzelisText ? duzelisText : prev?.insta?.instagram,
                                                disabled: true 
                                            }
                                        }
                                    ));setDuzelisText('')}} 
                                    size={22} className='cursor-pointer' />
                                }
                            </Label>
                            <Input
                            type='text'
                            disabled={landing?.insta?.disabled}
                            name='insta'
                            onChange={(e)=>setDuzelisText(e.target.value)}
                            value={landing?.insta?.disabled ? landing?.insta?.instagram : duzelisText}
                                className={clsx(
                                'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                                )}
                            />
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white flex items-center gap-2">
                                <span>Tiktok</span>
                                {
                                    landing?.tiktokInfo?.disabled ?
                                    <BiEdit 
                                    onClick={()=>{
                                        if(Object.values(landing).filter(item=>!Array.isArray(item)).find(item=>!item.disabled)) return toast.error('Tamamlanmayan editin qalib!')
                                        else setLanding(prev=>(
                                                {
                                                    ...prev, 
                                                    tiktokInfo: 
                                                    { 
                                                        ...prev.tiktokInfo, 
                                                        disabled: false 
                                                    }
                                                }
                                             ))
                                    }} 
                                    size={22} className='cursor-pointer'/> :
                                    <MdPlaylistAddCheckCircle 
                                    onClick={()=>{setLanding(prev=>(
                                        {
                                            ...prev, 
                                            tiktokInfo: 
                                            { 
                                                tiktok:duzelisText ? duzelisText : prev?.tiktokInfo?.tiktok,
                                                disabled: true 
                                            }
                                        }
                                    ));setDuzelisText('')}} 
                                    size={22} className='cursor-pointer' />
                                }
                            </Label>
                            <Input
                            type='text'
                            disabled={landing?.tiktokInfo?.disabled}
                            name='tiktokInfo'
                            onChange={(e)=>setDuzelisText(e.target.value)}
                            value={landing?.tiktokInfo?.disabled ? landing?.tiktokInfo?.tiktok : duzelisText}
                                className={clsx(
                                'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                                )}
                            />
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white flex items-center gap-2">
                                <span>Payment</span>
                                {
                                    landing?.paymentInfo?.disabled ?
                                    <BiEdit 
                                    onClick={()=>{
                                        if(Object.values(landing).filter(item=>!Array.isArray(item)).find(item=>!item.disabled)) return toast.error('Tamamlanmayan editin qalib!')
                                        else setLanding(prev=>(
                                                {
                                                    ...prev, 
                                                    paymentInfo: 
                                                    { 
                                                        ...prev.paymentInfo, 
                                                        disabled: false 
                                                    }
                                                }
                                             ))
                                    }} 
                                    size={22} className='cursor-pointer'/> :
                                    <MdPlaylistAddCheckCircle 
                                    onClick={()=>{setLanding(prev=>(
                                        {
                                            ...prev, 
                                            paymentInfo: 
                                            { 
                                                payment:duzelisText ? duzelisText : prev?.paymentInfo?.payment,
                                                disabled: true 
                                            }
                                        }
                                    ));setDuzelisText('')}} 
                                    size={22} className='cursor-pointer' />
                                }
                            </Label>
                            <Input
                            type='text'
                            disabled={landing?.paymentInfo?.disabled}
                            name='paymentInfo'
                            onChange={(e)=>setDuzelisText(e.target.value)}
                            value={landing?.paymentInfo?.disabled ? landing?.paymentInfo?.payment : duzelisText}
                            className={clsx(
                            'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                            )}
                            />
                        </Field>
                        <div className='w-full grid place-items-center'>
                            <Button onClick={handleSaveChanges} className="cursor-pointer rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500">
                                Save changes
                            </Button>
                        </div>
                    </Fieldset>
                {/* </form> */}
            </section>
        </main>
    );
}

export default AddProduct;
