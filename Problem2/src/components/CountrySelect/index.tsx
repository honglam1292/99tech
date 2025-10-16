import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import type { CountryType } from '../../types/types'

type CountrySelectType = {
  countries: CountryType[]
  selected?: string
  setSelected?: (country: string) => void
}

const filter = createFilterOptions<CountryType>({
  stringify: (option) => `${option.label} ${option.code}`
})

export default function CountrySelect({ countries = [], selected, setSelected }: CountrySelectType) {
  const valueObj = countries.find((c) => c.label === selected) || null

  return (
    <div className="w-full">
      <Autocomplete
        options={countries}
        autoHighlight
        value={valueObj}
        onChange={(_, newValue) => {
          if (newValue && setSelected) setSelected(newValue.label)
        }}
        filterOptions={filter}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        getOptionLabel={(option) => option.label}
        sx={{
          fontSize: '16px',
          '& .MuiInputBase-input': { fontSize: '16px' },
          '& .MuiInputLabel-root': { fontSize: '16px' },
          '& .MuiAutocomplete-option': { fontSize: '16px' }
        }}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props
          return (
            <Box
              key={key}
              component="li"
              sx={{ '& > img': { mr: 1, flexShrink: 0 } }}
              {...optionProps}
            >
              <img loading="lazy" width="20" src={option.img || ''} alt="" />
              {option.label}
            </Box>
          )
        }}
        renderInput={(params) => {
          const selectedOption = countries.find((c) => c.label === selected)
          return (
            <TextField
              {...params}
              variant="standard"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                startAdornment: selectedOption ? (
                  <img
                    loading="lazy"
                    width="24"
                    src={selectedOption.img || ''}
                    alt=""
                    style={{ marginRight: 8, marginLeft: 4 }}
                  />
                ) : null
              }}
              sx={{
                '& .MuiInputBase-root': { width: '100%' },
                '& .MuiAutocomplete-clearIndicator': { visibility: 'visible' },
                '& .MuiAutocomplete-popupIndicator': { display: 'none' },
                '& .MuiAutocomplete-inputRoot': { paddingRight: '8px !important' },
                '& input': { paddingLeft: selectedOption ? '40px' : undefined }
              }}
            />
          )
        }}
      />
    </div>
  )
}
