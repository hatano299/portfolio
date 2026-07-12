import LinkButton from "@/components/common/parts/LinkButton";
import type { Work } from "@/lib/common/work";
import Image from "next/image";

type Props = {
  work: Work;
};

const WorkCard = ({ work }: Props): React.ReactElement => {
  return (
    <div className="w-2xs rounded-2xl border-2 border-double border-[#AAAAAA] p-6 shadow-lg shadow-gray-500/30">
      <h3 className="text-3xl font-bold text-[#AAAAAA] opacity-25">WORK</h3>
      <Image
        src={work.imageUrl}
        alt={`${work.title}のイメージ`}
        width={288}
        height={160}
        className="rounded-2xl"
      />
      <h3 className="text-3xl font-bold">{work.title}</h3>
      <p className="text-base font-body">{work.createdAt}</p>
      <p className="text-base font-body">{work.description}</p>
      <div className="flex justify-end">
        <LinkButton
          variant="primary"
          label="view app"
          linkUrl={work.linkUrl}
          className="mt-2 w-30 border-[#AAAAAA]"
        />
      </div>
    </div>
  );
};

export default WorkCard;
