import { InputWrapper } from '@/pages/uncontrolled-form/wrappers';
import { InputRadio } from '@/shared/InputRadio';

{
    /* <InputWrapper>
    <label htmlFor="gender">Gender</label>
    <div className="flex justify-around gap-1">
        <div className="flex items-center gap-4">
            <InputRadio
                name="gender"
                type="radio"
                checked={checked}
                value="male"
                onClick={onClick}
            />
            <label htmlFor="genderMale">M</label>
        </div>
        <div className="flex items-center gap-4">
            <InputRadio
                name="gender"
                type="radio"
                checked={gender.current === 'male'}
                value="female"
                onClick={() => (gender.current = 'female')}
            />
            <label htmlFor="genderFemale">F</label>
        </div>
    </div>
</InputWrapper> */
}

export const RadioInput = ({
    checked,
    label,
    onClick,
}: {
    checked: boolean;
    label: string;
    onClick: () => void;
}) => {
    return (
        <div className="flex items-center gap-4">
            <InputRadio
                name="gender"
                type="radio"
                checked={checked}
                value="male"
                onClick={onClick}
            />
            <label htmlFor="genderMale">{label}</label>
        </div>
    );
};
