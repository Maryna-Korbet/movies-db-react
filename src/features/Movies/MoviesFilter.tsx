import { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { FilterAltOutlined } from "@mui/icons-material";
import { Autocomplete, FormControl, Paper, TextField, Button, debounce } from "@mui/material";
import { client, KeywordItem } from "../../api/tmdb";


export interface Filters {
    keywords: KeywordItem[]
};

interface MoviesFilterProps {
    onApply: (filters: Filters) => void;
};

export function MoviesFilter({ onApply }: MoviesFilterProps) {
    const [keywordsLoading, setKeywordsLoading] = useState(false);
    const [keywordsOptions, setKeywordsOptions] = useState<KeywordItem[]>([]);

    const { handleSubmit, control } = useForm<Filters>({
        defaultValues: {
            keywords: [],
        }
    });

    const fetchKeywordsOptions = async (query: string) => { 
        if (query) { 
            setKeywordsLoading(true);
                    
            const options = await client.getKeywords(query);
            setKeywordsLoading(false);
            setKeywordsOptions(options);
        }
        else {
            setKeywordsOptions([]);
        }
    }
    
    const debounceFetchKeywordsOptions = useMemo(() => debounce(fetchKeywordsOptions , 1000),[]);

    const handleApplyFilters = (data: Filters) => {
        onApply(data);
    };

    return (
        <Paper sx={{ p: 0.5, m: 2 }}>
            <form onSubmit={handleSubmit(onApply)}>
                <FormControl
                    component="fieldset"
                    variant="standard"
                    sx={{ m: 2, display: 'block', width: 300 }}
                >
                    <Controller
                        name="keywords"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                multiple
                                disablePortal
                                loading={keywordsLoading}
                                options={keywordsOptions}
                                filterOptions={(x) => x}   
                                getOptionLabel={(option) => option.name}
                                value={value}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField {...params} label="Keywords" />}
                                onChange={(__, value) => {
                                    onChange(value);
                                    if (!value || value.length === 0) {
                                        handleApplyFilters({ keywords: [] }); 
                                    }
                                }}
                                onInputChange={(__, value) => debounceFetchKeywordsOptions(value)}
                            />
                        )}
                    />    
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<FilterAltOutlined />}
                    sx={{ m: 2 }}
                >
                    Apply filter
                </Button>
            </form>
        </Paper>
    )
}