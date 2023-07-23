import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import * as fs from 'fs';
import tempfile from 'tempfile';
import { spawnSync } from 'child_process';

export const actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        if (
          !(formData.fileToUpload as File).name ||
          (formData.fileToUpload as File).name === 'undefined'
        ) {
          return fail(400, {
            error: true,
            message: 'You must provide a file to upload'
          });
        }

        const { fileToUpload } = formData as { fileToUpload: File };
        const caj_path = `${tempfile()}.caj`;
        const pdf_path = `${tempfile()}.caj`;
        
        // TODO: pipe the file in and out
        fs.writeFileSync(caj_path, Buffer.from(await fileToUpload.arrayBuffer()));
        const pythonProcess = spawnSync('python',["../caj2pdf/convert.py", caj_path, '-o', pdf_path], { encoding: "utf-8" });
        if (pythonProcess.status !== 0) {
          return fail(500, {
            error: true,
            message: 'Failed to convert file'
          });
        }

        // TODO: check if this call is correct
        return {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            "Content-Disposition": "attachment; filename="+fileToUpload.name+".pdf"
          },
          body:
        }
      }
} satisfies Actions;
