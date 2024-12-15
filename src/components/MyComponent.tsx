"use client";
import { useEffect, useRef, useState } from "react";




function usePromise(input: {
    isLoading: true,
    data: null
} | {
    isLoading: false,
    data: string;
}) {

    const resRef = useRef<(data: string) => void>(null);

    const promiseRef = useRef(
        new Promise((res) => {
            resRef.current = res;

            //res("xxx") // 👈 this will resolve though
        })
    );

    useEffect(() => {
        if (!input.isLoading) {
            resRef.current?.(input.data);
        }

    }, [input]);

    return promiseRef.current;
}

export function MyComponent() {

    const [value, setValue] = useState<null | string>(null);

    const prom = usePromise(value ? {
        isLoading: false,
        data: value
    } : {
        isLoading: true,
        data: null
    });

    prom.then((v) => alert(v))

    return <div >

        <button onClick={() => setValue("123")}>Click me</button>
    </div>
}