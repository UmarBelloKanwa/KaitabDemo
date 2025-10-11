'use client';

import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ReplayIcon from '@mui/icons-material/Replay';
import IconButton from '@mui/material/IconButton';

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
    const [inputValue, setInputValue] = React.useState('');
    const [selectedTopics, setSelectedTopics] = React.useState<SelectedTopic[]>([]);
    const [subjectOptions, setSubjectOptions] = React.useState<GroupedTopic[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    const fetchTopics = async () => {
        setLoading(true);
        setError(null);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1200)); // simulate API delay

            // ✅ Fake topics
            const fakeData: GroupedTopic[] = [
                { id: '1', name: 'Artificial Intelligence', category: 'Technology', categoryId: 'tech' },
                { id: '2', name: 'Machine Learning', category: 'Technology', categoryId: 'tech' },
                { id: '3', name: 'Personal Finance', category: 'Business', categoryId: 'biz' },
                { id: '4', name: 'Investing', category: 'Business', categoryId: 'biz' },
                { id: '5', name: 'Self Improvement', category: 'Lifestyle', categoryId: 'life' },
                { id: '6', name: 'Health & Fitness', category: 'Lifestyle', categoryId: 'life' },
                { id: '7', name: 'Web Development', category: 'Technology', categoryId: 'tech' },
                { id: '8', name: 'Psychology', category: 'Science', categoryId: 'sci' },
            ];

            setSubjectOptions(fakeData);
        } catch (err: unknown) {
            setError(`Failed to fetch topics, please try again`);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchTopics();
    }, []);

    const handleChange = (_event: React.SyntheticEvent, newValue: (string | GroupedTopic)[]) => {
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
        const filtered = options.filter((option) =>
            option.name.toLowerCase().includes(state.inputValue.toLowerCase())
        );

        const isExisting = options.some(
            (option) => option.name.toLowerCase() === state.inputValue.toLowerCase()
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
                loading={loading}
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
                        helperText={error ? error : "Select or add topics"}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : error ? (
                                        <IconButton onClick={fetchTopics}>
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
