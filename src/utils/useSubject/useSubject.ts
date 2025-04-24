import {Subject} from '@/classes/Subject/Subject';
import {useEffect, useState} from "react";

export const useSubject = <T>($subject: Subject<T>): T => {
    const [value, setValue] = useState<T>($subject.value);

    useEffect(() => {
        const unsubscribeCallback = $subject.subscribe(() => {
            setValue($subject.value);
        });

        return (): void => {
            unsubscribeCallback();
        };
    }, []);

    return value;
};
