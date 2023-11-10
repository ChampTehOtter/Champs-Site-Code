import { ChampMedia, MEDIA_SECTIONS } from 'store';
import { supabaseClient } from 'utility';

export const serviceGetMedia = async (): Promise<ChampMedia[]|null> => {
    const { data, error } = await supabaseClient.from('media').select()
    if (error) {
        console.log('Error on data', error)
        return null
    }
    return data
}

export const serviceDownloadMedia = (url: string) => {
    const { data } = supabaseClient.storage.from('media').getPublicUrl(url, {
        download: true,
    })
    window.open(data.publicUrl)
}

export const serviceDeleteMedia = async (item: ChampMedia) => {
    const { error } = await supabaseClient.from('media').delete().eq('id', item.id)
    if (!error) {
        const { data, error: bucket_error } = await supabaseClient.storage.from('media').remove([item.url])
        if (bucket_error) {
            console.error(bucket_error)
        }
        console.info(data)
    }
    console.error(error)
}

export const mediaInsert = async (media: any) => {
    const { error } = await supabaseClient
        .from('media')
        .insert(media)
    if (error) {
        console.log('Error Inserting', error)
        return false
    }
    return true
}

export const mediaUpload = async (file: File, section: MEDIA_SECTIONS): Promise<Partial<ChampMedia> | null> => {
    const meta = {
        size: file.size,
        mime: file.type,
        filename: file.name,
        section
    }

    const { data, error } = await supabaseClient
        .storage
        .from('media')
        .upload(`${section}/${file.name}`, file, {
            cacheControl: '3600',
            upsert: false
    })

    if (error) {
        console.log('Upload Error', error)
        return null
    }

    return { ...meta, url: data?.path }
}