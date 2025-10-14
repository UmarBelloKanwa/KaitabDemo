'use client';

import React, { useState, SyntheticEvent } from 'react';
import {
    Autocomplete,
    Chip,
    TextField,
    Box,
    CircularProgress,
    IconButton
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useUserTopics } from "@/lib/api/topics"; // SWR hook

interface AddBookTopicProps {
    onChange?: (topics: SelectedTopic[]) => void;
}

interface GroupedTopic {
    id: string;
    name: string;
    category: string;
    categoryId: string;
}

interface SelectedTopic {
    name: string;
    topicId: string | null;
    category: string;
    categoryId: string | null;
    isCustom: boolean;
}

const AddBookTopic: React.FC<AddBookTopicProps> = ({ onChange }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedTopics, setSelectedTopics] = useState<SelectedTopic[]>([]);

    // ✅ Use SWR hook
    const { data, error, isLoading, mutate } = useUserTopics();
    // console.log("intersts", data);

    // Transform data from API to Autocomplete-friendly format
    const subjectOptions: GroupedTopic[] = React.useMemo(() => {
        if (!data) return [];
        const allTopics: GroupedTopic[] = [];
        for (const category in data) {
            const categoryTopics = data[category];
            categoryTopics.forEach((item: { id: string; name: string; categoryId: string }) => {
                allTopics.push({
                    id: item.id,
                    name: item.name,
                    category,
                    categoryId: item.categoryId,
                });
            });
        }
        return allTopics;
    }, [data]);

    const handleChange = (_event: SyntheticEvent, newValue: (string | GroupedTopic)[]) => {
        const updated: SelectedTopic[] = newValue.map((val) => {
            if (typeof val === 'string') {
                const match = val.match(/^Add\s+"(.+)"$/);
                const customName = match ? match[1] : val;
                return {
                    name: customName,
                    topicId: null,
                    category: 'Custom',
                    categoryId: null,
                    isCustom: true,
                };
            } else {
                return {
                    name: val.name,
                    topicId: val.id,
                    category: val.category,
                    categoryId: val.categoryId,
                    isCustom: false,
                };
            }
        });

        setSelectedTopics(updated);
        onChange?.(updated);
    };

    const filterOptions = (options: GroupedTopic[], state: { inputValue: string }) => {
        const filtered = options.filter(option =>
            option.name.toLowerCase().includes(state.inputValue.toLowerCase())
        );

        const isExisting = options.some(option =>
            option.name.toLowerCase() === state.inputValue.toLowerCase()
        );

        if (state.inputValue !== '' && !isExisting) {
            filtered.push({
                id: '',
                name: `Add "${state.inputValue}"`,
                category: 'Custom',
                categoryId: '',
            });
        }

        return filtered;
    };

    return (
        <Box>
            <Autocomplete
                multiple
                freeSolo
                loading={isLoading}
                options={subjectOptions}
                groupBy={(option) => option.category}
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.name
                }
                value={selectedTopics.map((topic) =>
                    topic.isCustom
                        ? `Add "${topic.name}"`
                        : {
                            id: topic.topicId!,
                            name: topic.name,
                            category: topic.category,
                            categoryId: topic.categoryId!,
                        }
                )}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                onChange={handleChange}
                filterOptions={filterOptions}
                renderTags={(value: unknown[], getTagProps) =>
                    selectedTopics.map((option, index) => (
                        <Chip
                            variant="outlined"
                            label={option.name}
                            {...getTagProps({ index })}
                            key={`${option.name}-${index}`}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Type or select a topic"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? `Failed to fetch topics: ${error.message}` : "Select or add topics"}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {isLoading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : error ? (
                                        <IconButton onClick={() => mutate()}>
                                            <ReplayIcon fontSize="small" />
                                        </IconButton>
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        </Box>
    );
};

export default AddBookTopic;
