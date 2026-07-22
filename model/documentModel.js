import db from "../config/db.js";


const Documents = {

    createDocument: async (data) => {
        const query = `
        INSERT INTO documents
        (application_id, requirement_id, file_url, version, po_compliance)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;

        const result = await db.query(query, [
            data.application_id,
            data.requirement_id,
            data.file_url,
            data.version,
            data.po_compliance
        ]);

        return result.rows[0];
    },

    updateDocumentFileUpload: async (data) => {
        const query = `
        UPDATE documents SET
            file_url = $1,
            version = version + 1,
            uploaded_at = CURRENT_TIMESTAMP
        WHERE application_id = $2 AND requirement_id = $3
        RETURNING *;
        `;

        const result = await db.query(query, [
            data.file_url,
            data.application_id,
            data.requirement_id
        ]);
       return result.rows[0];
    },

    readDocumentByApplication: async (application_id, program_id) => {

        const query = `
            SELECT
                r.id as requirement_id,
                r.title,
                r.description,
                d.file_url,
                d.version,
                d.uploaded_at,
                dr.status,
                dr.remarks,
                dr.reviewed_at
            FROM requirements r
            LEFT JOIN documents d ON r.id = d.requirement_id
                AND d.application_id = $1
            LEFT JOIN document_reviews dr ON d.id = dr.document_id
                AND dr.id = (
                    SELECT MAX(id)
                    FROM document_reviews
                    WHERE document_id = d.id
                )
            WHERE r.program_id = $2
            ORDER BY r.display_order ASC
            `;

        const result = await db.query(query, [
            application_id,
            program_id
        ]);
        
        return result.rows;
    },

}

export default Documents;