import { Button, Card } from "antd";
import { useForm } from "react-hook-form";
import FileUploader from "~/components/ui/FileUploader";
import SelectBox from "~/components/ui/SelectBox";
import TextAreaBox from "~/components/ui/TextAreaBox";
import TextBox from "~/components/ui/TextBox";

const index = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            system: "assistant speak first",
            systemPrompt:
                "আসসালামু আলাইকুম! আমি জেরিন, বাংলাদেশ ব্যাংকের ডিজিটাল সহকারী।   আপনার আর্থিক যাত্রাকে সহজ, নিরাপদ ও স্মার্ট করে তুলতে আমি এখানে আছি।   দয়া করে বলুন, আজ আমি কীভাবে আপনাকে সহযোগিতা করতে পারি?",
            userPrompt:
                "আমি আমার অ্যাকাউন্টে লগইন করতে পারছি না। আপনি কি আমাকে সাহায্য করতে পারেন?",
        },
    });
    return (
        <Card title="System Train">
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit((data) => console.log(data))}
            >
                <SelectBox
                    name="system"
                    control={control}
                    label="Select System"
                    placeholder="Select System"
                    options={[
                        {
                            label: "Assistant Speak first",
                            value: "assistant speak first",
                        },
                        {
                            label: "User Speak first",
                            value: "user speak first",
                        },
                        {
                            label: "Assistant speak first with model generated message",
                            value: "assistant speak first with model generated message",
                        },
                    ]}
                />
                <TextBox
                    control={control}
                    name="systemPrompt"
                    label="System Prompt"
                    placeholder="Enter System Prompt"
                    defaultValue={
                        "আসসালামু আলাইকুম! আমি জেরিন, বাংলাদেশ ব্যাংকের ডিজিটাল সহকারী। আপনার আর্থিক যাত্রাকে সহজ, নিরাপদ ও স্মার্ট করে তুলতে আমি এখানে আছি।   দয়া করে বলুন, আজ আমি কীভাবে আপনাকে সহযোগিতা করতে পারি?"
                    }
                />

                <TextAreaBox
                    control={control}
                    name="userPrompt"
                    label="User Prompt"
                    placeholder="Enter User Prompt"
                    rows={8}
                    defaultValue={
                        "আমি আমার অ্যাকাউন্টে লগইন করতে পারছি না। আপনি কি আমাকে সাহায্য করতে পারেন?"
                    }
                />

                <FileUploader name="file" label="Upload File" />

                <Button htmlType="submit" type="primary" className="w-fit float-right">Submit</Button>
            </form>
        </Card>
    );
};

export default index;
