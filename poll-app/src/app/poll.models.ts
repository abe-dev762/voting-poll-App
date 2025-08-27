export interface OptionVote{
    voteOption: string;
    voteCount: number;
}

export interface Poll {
    id?: number | null;
    question: string;
    options: OptionVote[];
}