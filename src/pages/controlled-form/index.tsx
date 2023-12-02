import { ChildrenReveal } from '@/components/ChildrenReveal';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
    const uncontrolled = useSelector((state: RootState) => state.uncontrolled);
    const dispatch = useDispatch();

    const onSubmit = () => {};

    return (
        <ChildrenReveal>
            <form>
                <label>
                    Name:
                    <input placeholder="John Doe" />
                </label>
            </form>
        </ChildrenReveal>
    );
};

export default Page;
